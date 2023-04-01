import { useState, useEffect, useRef, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Puff } from "react-loader-spinner";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MapRef } from "react-map-gl";
import { BottomSheet } from "react-spring-bottom-sheet";
import { getAreaOfPolygon, getCenterOfBounds, convertArea } from "geolib";

import { PropertyFilter, PropertyList, MapComponent } from "../components";
import { Coordinates, MANILA_LATITUDE, MANILA_LONGITUDE } from "../constants";
import {
  useScreenSize,
  useDebounce,
  useFirstRender,
  calculateGeohashPrecision,
} from "../utils";
import { getNearestProperties } from "../lib/apis";

export const getUserAddress = (
  position: any,
  setUserPositionCallback: (position: Coordinates) => void
) => {
  setUserPositionCallback({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
};

interface PROPERTIES_RESULT_SCHEMA {
  results: Array<any>;
  lastKey?: null | { [key: string]: any };
  length?: number;
}

const DEFAULT_MAP_CENTER = {
  lat: +MANILA_LATITUDE,
  lng: +MANILA_LONGITUDE,
  precision: 1,
};

const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function MapPage(): JSX.Element {
  const {
    response: fetchedProperties,
    isLoading: isFetchingNearProperties,
    invokeApi: fetchNearProperties,
  } = getNearestProperties();
  const [isPropertyModalActive, setIsPropertyDrawerActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [activeProperty, setActiveProperty] = useState<any | null>(null);
  const [lastPropertyKey, setLastPropertyKey] = useState<any>(null);
  const [userCoordinates, setUserCoordinates] = useState<
    Coordinates | undefined
  >();
  // * nearProperties is 2D-array consisting of `page` and `properties` per
  const [nearProperties, setNearProperties] = useState<Array<any>>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [visibleProperties, setVisibleProperties] = useState<Array<any>>([]);
  const [viewState, setViewState] = useState<any>(DEFAULT_MAP_CENTER);
  const mapRef = useRef<MapRef | null>(null);

  const debouncedViewState = useDebounce(viewState, 500);
  const display = useScreenSize();
  const isFirstRender = useFirstRender();

  // * Ask for user's location
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => getUserAddress(pos, setUserCoordinates),
  //     (err) => console.log(err),
  //     OPTIONS
  //   );
  // }, []);

  // * Get nearest properties & add to `nearProperties` 2D-array + set the lastKey
  useEffect(() => {
    if (fetchedProperties) {
      const { results = [], lastKey = null } =
        fetchedProperties as PROPERTIES_RESULT_SCHEMA;
      setNearProperties([...nearProperties, results]);
      setLastPropertyKey(lastKey);
    }
  }, [fetchedProperties]);

  useEffect(() => {
    if (nearProperties && currentPageNumber < nearProperties.length) {
      setVisibleProperties(nearProperties[currentPageNumber]);
    }
  }, [currentPageNumber, nearProperties]);

  useEffect(() => {
    fetchNearProperties({
      lat: MANILA_LATITUDE,
      lng: MANILA_LONGITUDE,
      precision: 1,
    });
  }, []);

  const openPropertyDetails = (property: any) => {
    // TODO: Add a popup?
    // setSelectedProperty(property);
    // setIsPropertyDrawerActive(true);
    window.open(`/properties/${property.pk}`, "_blank");
  };

  const onPropertyHover = useCallback((property: any) => {
    setActiveProperty(property);
    setIsPropertyDrawerActive(true);
  }, []);

  const handleViewState = useCallback(
    (val: any) => {
      const map = mapRef.current;
      if (map) {
        const bounds: any = map.getMap()?.getBounds();
        // * `polygon` variable represents the rectangular area
        const polygon: any = [
          [bounds._ne.lat, bounds._sw.lng],
          [bounds._ne.lat, bounds._ne.lng],
          [bounds._sw.lat, bounds._ne.lng],
          [bounds._sw.lat, bounds._sw.lng],
        ];
        const area = convertArea(getAreaOfPolygon(polygon), "km2");
        const center = getCenterOfBounds(polygon);
        const precision = calculateGeohashPrecision(area);
        setViewState({
          lat: center.longitude,
          lng: center.latitude,
          precision,
        });
      }
    },
    [setViewState]
  );

  useEffect(() => {}, [viewState]);

  useEffect(() => {
    if (debouncedViewState && !isFirstRender) {
      const { lat, lng, precision } = debouncedViewState;
      // * Clear data
      setLastPropertyKey(null);
      setNearProperties([]);
      setCurrentPageNumber(0);
      setVisibleProperties([]);
      // * Call nearest properties API
      fetchNearProperties({
        lat,
        lng,
        precision,
      });
    }
  }, [debouncedViewState]);

  const handleNextButtonClicked = () => {
    if (currentPageNumber < nearProperties.length) {
      setCurrentPageNumber(currentPageNumber + 1);
      if (lastPropertyKey && debouncedViewState) {
        fetchNearProperties({
          ...debouncedViewState,
          lastKey: lastPropertyKey?.pk ?? null,
          geohash: lastPropertyKey?.geohash ?? null,
        });
      }
    }
  };

  const handlePreviousButtonClicked = () => {
    if (currentPageNumber > 0) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  return (
    <div className="flex w-100 h-100 flex-nowrap flex-column grow flex-col relative">
      <Grid
        item
        container
        rowSpacing={2}
        columns={2}
        direction={{
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        }}
        sx={{
          position: "relative",
          height: {
            lg: "100%",
            md: "100%",
            sm: "100%",
          },
          flexGrow: 1,
          background: "inherit",
          width: "100%",
        }}
        flexWrap="nowrap"
      >
        {/* Filter container */}
        <Grid
          item
          md={6}
          container
          sx={{
            display: { xs: "none", md: "block" },
            flexShrink: 0,
            maxWidth: "50%",
            width: "50%",
          }}
        >
          <PropertyFilter>
            {/* <Toolbar /> */}
            {isFetchingNearProperties && (
              <Puff
                height="5rem"
                width="5rem"
                radius={1}
                color="#6c63ff"
                ariaLabel="puff-loading"
                visible
                wrapperStyle={{
                  margin: "auto",
                }}
              />
            )}{" "}
            {!isFetchingNearProperties && (
              <PropertyList
                properties={visibleProperties}
                onHover={onPropertyHover}
                disableNextButton={
                  !nearProperties.length ||
                  (currentPageNumber === nearProperties.length - 1 &&
                    !lastPropertyKey)
                }
                disablePrevButton={currentPageNumber === 0}
                handleNextButtonClicked={handleNextButtonClicked}
                handlePreviousButtonClicked={handlePreviousButtonClicked}
              />
            )}
          </PropertyFilter>
        </Grid>
        {/* Map container */}
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            height: "100%",
            flexGrow: 1,
            display: "flex",
          }}
        >
          <Box
            sx={{
              height: "calc(100vh - 4rem)",
              minHeight: "calc(100vh - 4rem)",
              flexShrink: 0,
              width: { xs: "100%" },
              position: { lg: "sticky", md: "sticky", sm: "relative" },
              top: { sm: 0, md: "4rem", lg: "4rem" },
              contain: "paint layout",
            }}
          >
            <MapComponent
              lat={userCoordinates?.lat ?? +MANILA_LATITUDE}
              lng={userCoordinates?.lng ?? +MANILA_LONGITUDE}
              viewStateHandler={handleViewState}
              onClick={openPropertyDetails}
              properties={visibleProperties}
              activeProperty={activeProperty}
              mapRef={mapRef}
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
        <BottomSheet
          open={display.MD}
          blocking={false}
          skipInitialTransition
          defaultSnap={({ maxHeight }: { maxHeight: number }) => maxHeight / 2}
          snapPoints={({ maxHeight }: { maxHeight: number }) => [
            maxHeight - maxHeight / 10,
            maxHeight / 4,
            maxHeight * 0.6,
          ]}
          expandOnContentDrag
        >
          <Box className="flex justify-center py-5 item-center">
            {isFetchingNearProperties && (
              <Puff
                height="5rem"
                width="5rem"
                radius={1}
                color="#6c63ff"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass="w-100 flex justify-center items-center"
                visible={true}
              />
            )}{" "}
            {!isFetchingNearProperties && (
              <PropertyList
                disableNextButton={
                  !nearProperties.length ||
                  (currentPageNumber === nearProperties.length - 1 &&
                    !lastPropertyKey)
                }
                disablePrevButton={currentPageNumber === 0}
                properties={visibleProperties}
                onHover={onPropertyHover}
                handleNextButtonClicked={handleNextButtonClicked}
                handlePreviousButtonClicked={handlePreviousButtonClicked}
              />
            )}
          </Box>
        </BottomSheet>
      </Box>
    </div>
  );
}

export { MapPage };

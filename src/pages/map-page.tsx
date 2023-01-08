import { useState, useEffect, useRef, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Puff } from "react-loader-spinner";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { BottomSheet } from "react-spring-bottom-sheet";

import { PropertyFilter, PropertyList, MapComponent } from "../components";
import { Coordinates, MANILA_LATITUDE, MANILA_LONGITUDE } from "../constants";
import { useScreenSize } from "../utils";
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

interface MapCenter {
  lat: number;
  lng: number;
  precision: number;
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
  const mapCenterRef = useRef(DEFAULT_MAP_CENTER);
  const [userCoordinates, setUserCoordinates] = useState<
    Coordinates | undefined
  >();
  // * nearProperties is 2D-array consisting of `page` and `properties` per
  const [nearProperties, setNearProperties] = useState<Array<any>>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [visibleProperties, setVisibleProperties] = useState<Array<any>>([]);

  const display = useScreenSize();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => getUserAddress(pos, setUserCoordinates),
      (err) => console.log(err),
      OPTIONS
    );
  }, []);

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
    setSelectedProperty(property);
    setIsPropertyDrawerActive(true);
  };

  const onPropertyHover = useCallback((property: any) => {
    setActiveProperty(property);
    setIsPropertyDrawerActive(true);
  }, []);

  const handleViewState = useCallback((val: MapCenter) => {
    console.log("hello");
    if (mapCenterRef.current) {
      const { lat = null, lng = null, precision = 1 } = val;
      const {
        lat: latRef = null,
        lng: lngRef = null,
        precision: precisionRef = 1,
      } = mapCenterRef.current;
      if (lat !== latRef || lng !== lngRef || precision !== precisionRef) {
        mapCenterRef.current = val;
      }
    } else {
      mapCenterRef.current = val;
    }
    // * Clear data
    setLastPropertyKey(null);
    setNearProperties([]);
    setCurrentPageNumber(0);
    setVisibleProperties([]);
    fetchNearProperties(val);
  }, []);

  const handleNextButtonClicked = () => {
    if (currentPageNumber < nearProperties.length) {
      setCurrentPageNumber(currentPageNumber + 1);
      if (lastPropertyKey && mapCenterRef.current) {
        fetchNearProperties({
          ...mapCenterRef.current,
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
    <div className="flex w-100 h-100 flex-wrap flex-column grow flex-col relative">
      <Grid
        item
        container
        rowSpacing={{ lg: 2 }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
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
            sm: "80%",
          },
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Grid
          item
          md={6}
          lg={6}
          xl={4}
          sx={{ display: { sm: "none", md: "block" } }}
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
                wrapperStyle={{ marginTop: "50%" }}
                wrapperClass="m-auto my-2"
                visible
              />
            )}{" "}
            {!isFetchingNearProperties && (
              <PropertyList
                properties={visibleProperties}
                onHover={onPropertyHover}
                disableNextButton={
                  currentPageNumber === nearProperties.length - 1 &&
                  !lastPropertyKey
                }
                disablePrevButton={currentPageNumber === 0}
                handleNextButtonClicked={handleNextButtonClicked}
                handlePreviousButtonClicked={handlePreviousButtonClicked}
              />
            )}
          </PropertyFilter>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={8}
          sm={12}
          sx={{
            height: { lg: "100%", md: "100%", sm: "100%" },
            flexGrow: 1,
            display: "flex",
          }}
        >
          <Box
            sx={{
              height: "calc(100vh - 4rem)",
              minHeight: "calc(100vh - 4rem)",
              width: { md: "100%", lg: "100%", xs: "100%" },
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
                  currentPageNumber === nearProperties.length - 1 &&
                  !lastPropertyKey
                }
                disablePrevButton={currentPageNumber === 0}
                properties={visibleProperties}
                onHover={onPropertyHover}
              />
            )}
          </Box>
        </BottomSheet>
      </Box>
    </div>
  );
}

export { MapPage };

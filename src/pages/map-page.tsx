import { useState, useEffect, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Puff } from "react-loader-spinner";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { BottomSheet } from "react-spring-bottom-sheet";

import {
  PropertyFilter,
  PropertyList,
  PropertyScroller,
  MapComponent,
  Markers,
} from "../components";
import { Coordinates, MANILA_LATITUDE, MANILA_LONGITUDE } from "../constants";
import { useDebounce } from "../utils/hooks";
import { calculateGeohashPrecision, useScreenSize } from "../utils";
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

enum DATA_STATE {
  LOADING = 1,
  LOADED,
  NO_DATA,
}

const MapPage = () => {
  const [viewState, setViewState] = useState<any>(); // * User's map positioning
  const debouncedViewingArea = useDebounce(viewState, 500); // * Debounced user's map positioning
  const [displayedProperties, setDisplayedProperties] = useState<any[]>([]); // * Visible properties on the list (windowed)
  const {
    response: nearestProperties,
    isLoading: isFetchingNearProperties,
    invokeApi: fetchNearProperties,
  } = getNearestProperties(); // * Actual nearest properties, `displayedProperties` are the properties visible on screen
  const debouncedNearProperties = useDebounce(nearestProperties, 500);
  const [lastItemKey, setLastItemKey] = useState<string | null>(null);
  const [isPropertyModalActive, setIsPropertyDrawerActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [activeProperty, setActiveProperty] = useState<any | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<
    Coordinates | undefined
  >();
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const display = useScreenSize();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => getUserAddress(pos, setUserCoordinates),
      (err) => console.log(err),
      options
    );
  }, []);

  useEffect(() => {
    const nearestProps: any[] = nearestProperties?.results ?? [];
    setDisplayedProperties([...displayedProperties, ...nearestProps]);
  }, [nearestProperties, lastItemKey]);

  useEffect(() => {
    if (debouncedViewingArea) {
      const { area, center } = debouncedViewingArea;
      const precision = calculateGeohashPrecision(area);
      // ! For some reason, they are reversed
      fetchNearProperties({
        lat: center.longitude,
        lng: center.latitude,
        precision,
      });
    }
  }, [debouncedViewingArea]);

  useEffect(() => {
    fetchNearProperties({
      lat: 14,
      lng: 121,
      precision: 1,
    });
  }, []);

  const openPropertyDetails = (property: any) => {
    setSelectedProperty(property);
    setIsPropertyDrawerActive(true);
  };

  const onPropertyHover = (property: any) => {
    setActiveProperty(property);
    setIsPropertyDrawerActive(true);
  };

  const loadMoreItems = async () => {
    if (lastItemKey) {
      const itemsPerPage = 20;
      const itemStatusMap: any = {};
      setDisplayedProperties([...displayedProperties, ...itemStatusMap]);
      const { area, center } = debouncedViewingArea;
      const precision = calculateGeohashPrecision(area);
      await fetchNearProperties({
        lat: center.longitude,
        lng: center.latitude,
        precision,
        pk: lastItemKey ?? "",
      });
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
                visible={true}
              />
            )}{" "}
            {/* {!isFetchingNearProperties && (
              <PropertyList
                properties={(displayedProperties as any) ?? []}
                onHover={onPropertyHover}
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems}
              />
            )} */}
            <PropertyScroller
              hasNextPage={!!lastItemKey}
              isNextPageLoading={isFetchingNearProperties}
              items={debouncedNearProperties}
              loadNextPage={loadMoreItems}
            />
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
              viewStateHandler={(viewStateEventPayload) =>
                setViewState(viewStateEventPayload)
              }
            >
              {Markers(
                openPropertyDetails,
                (displayedProperties as any) ?? [],
                activeProperty
              )}
            </MapComponent>
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
            {/* {!isFetchingNearProperties && (
              <PropertyList
                properties={
                  (debouncedNearProperties as any)
                    ? (debouncedNearProperties as any).results
                    : []
                }
                onHover={onPropertyHover}
                isItemLoaded={isItemLoaded}
                loadMoreItems={loadMoreItems}
              />
            )} */}
          </Box>
        </BottomSheet>
      </Box>
    </div>
  );
};

export { MapPage };

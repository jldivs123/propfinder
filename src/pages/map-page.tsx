import styled from "styled-components";
import { FC, useState, useEffect, useRef } from "react";
import ReactMap, { Marker, Popup, MapRef } from "react-map-gl";
import { getAreaOfPolygon, getCenterOfBounds, convertArea } from "geolib";
import { LngLatBounds, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Puff } from "react-loader-spinner";
import Typography from "@mui/material/Typography";

import { PropertyFilter, PropertyList } from "../components";
import {
  MAPBOX_PUBLIC_TOKEN,
  MANILA_LATITUDE,
  GeoJSON,
  MANILA_LONGITUDE,
} from "../constants";
import { useDebounce } from "../utils/hooks";
import { calculateGeohashPrecision } from "../utils";
import { getNearestProperties } from "../lib/apis";

export interface Coordinates {
  lat: number;
  lng: number;
}
export const getUserAddress = (
  position: any,
  setUserPositionCallback: (position: Coordinates) => void
) => {
  setUserPositionCallback({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
};

const MapContainer = styled.div``;
// * https://github.com/visgl/react-map-gl/issues/750
const Markers = (
  onClick: (args: any) => any,
  properties: any,
  activeProperty: any
) => {
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <>
      {properties.map((property: any, index: number) => {
        const latitude = property.geojson.geometry.coordinates[0];
        const longitude = property.geojson.geometry.coordinates[1];
        const price =
          property.geojson.properties.minimumSellingPrice.replace(
            /[, ]+/g,
            ""
          ) ?? "0";
        return (
          <Marker
            key={"marker-" + index}
            latitude={longitude}
            longitude={latitude}
          >
            <div
              className="flex justify-center items-center shadow-lg rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => onClick(property)}
              style={{
                width: "64px",
                background:
                  activeProperty?.pk === property.pk ? "#1e293b" : "white",
                height: "32px",
                color: activeProperty?.pk === property.pk ? "white" : "black",
              }}
            >
              <Typography fontWeight={600} fontSize={14}>
                &#8369;{formatter.format(Number(price))}
              </Typography>
            </div>
          </Marker>
        );
      })}
    </>
  );
};

const MapComponent: FC<
  Coordinates & { viewStateHandler: (value: any) => void }
> = ({ children, lat, lng, viewStateHandler }) => {
  // * Philippine Area of Responsibility
  const southWest = new LngLat(114.873046875, 5.090944175033399);
  const northEast = new LngLat(128.4521484375, 20.014645445341365);
  const bounds = new LngLatBounds(southWest, northEast);
  const mapRef = useRef<MapRef | null>(null);

  const stateHandler = (value: any) => {
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
      viewStateHandler({
        area,
        center,
        bounds: {
          minLat: bounds._sw.lat,
          maxLat: bounds._ne.lat,
          minLng: bounds._sw.lng,
          maxLng: bounds._ne.lng,
        },
      });
    }
  };

  return (
    <ReactMap
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 4,
      }}
      ref={mapRef}
      onMove={(e: any) => stateHandler(e.viewState)}
      style={{
        width: "63%",
        minHeight: "100px",
        height: "calc(100% - 64px)",
        position: "fixed",
        flexGrow: "1",
      }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      // maxBounds={bounds}
      maxZoom={18}
      minZoom={3}
    >
      {children}
    </ReactMap>
  );
};

const MapPage = () => {
  const [viewState, setViewState] = useState<any>();
  const debouncedViewingArea = useDebounce(viewState, 500);
  const {
    response: nearestProperties,
    isLoading: isFetchingNearProperties,
    invokeApi: fetchNearProperties,
  } = getNearestProperties();
  const debouncedNearProperties = useDebounce(nearestProperties, 500);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => getUserAddress(pos, setUserCoordinates),
      (err) => console.log(err),
      options
    );
  }, []);

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

  return (
    <div className="flex mx-0 w-full h-max min-h-screen">
      <PropertyFilter>
        {/* <Toolbar /> */}
        {isFetchingNearProperties && (
          <Puff
            height="5rem"
            width="5rem"
            radius={1}
            color="#6c63ff"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass="m-auto my-2"
            visible={true}
          />
        )}{" "}
        {!isFetchingNearProperties && (
          <PropertyList
            properties={
              (debouncedNearProperties as any)
                ? (debouncedNearProperties as any).results
                : []
            }
            onHover={onPropertyHover}
          />
        )}
      </PropertyFilter>
      <MapContainer className="relative w-2/3 h-100 flex">
        <MapComponent
          lat={userCoordinates?.lat ?? +MANILA_LATITUDE}
          lng={userCoordinates?.lng ?? +MANILA_LONGITUDE}
          viewStateHandler={(viewStateEventPayload) =>
            setViewState(viewStateEventPayload)
          }
        >
          {Markers(
            openPropertyDetails,
            (debouncedNearProperties as any)
              ? (debouncedNearProperties as any).results
              : [],
            activeProperty
          )}
        </MapComponent>
      </MapContainer>
    </div>
  );
};

export { MapPage };

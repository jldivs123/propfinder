import styled from "styled-components";
import { FC, useState, useEffect } from "react";
import ReactMap, { Marker, Popup } from "react-map-gl";
import { LngLatBounds, LngLat } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import { THEME_COLORS } from "../constants";
import { PropertyFilter, PropertyCard, PropertyList } from "../components";
import {
  MAPBOX_PUBLIC_TOKEN,
  MANILA_LATITUDE,
  GeoJSON,
  MANILA_LONGITUDE,
} from "../constants";

export interface Coordinates {
  lat: number;
  lng: number;
}

const StyledPopup = styled(Popup)`
  border: 2px solid red;
`;

const StyledDrawer = styled(Drawer)`
  background-color: ${THEME_COLORS.GRAY};
`;

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
const Markers = (onClick: (args: any) => any) => {
  return (
    <>
      {/* {properties.map((property: GeoJSON, index: number) => {
        const latitude = property.geometry.coordinates[1];
        const longitude = property.geometry.coordinates[0];
        return (
          <Marker
            key={"marker-" + index}
            latitude={latitude}
            longitude={longitude}
          >
            <img
              src="./Home_4.png"
              onClick={() => {
                onClick(property);
              }}
            />
          </Marker>
        );
      })} */}
    </>
  );
};

const MapComponent: FC<
  Coordinates & { viewStateHandler: (value: any) => void }
> = ({ children, lat, lng, viewStateHandler }) => {
  // * Philippine Area of Responsibility
  const southWest = new LngLat(115.07080078125, 5.014338718527209);
  const northEast = new LngLat(128.4521484375, 20.014645445341365);
  // const bounds = [
  //   { lng: 115.07080078125, lat: 5.014338718527209 },
  //   { lng: 128.4521484375, lat: 20.014645445341365 },
  // ];
  const bounds = new LngLatBounds(southWest, northEast);

  return (
    <ReactMap
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 10,
      }}
      onZoom={(e) => {
        viewStateHandler(e.viewState);
      }}
      onMove={(e) => viewStateHandler(e.viewState)}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      maxBounds={bounds}
      maxZoom={13}
      minZoom={5}
    >
      {children}
    </ReactMap>
  );
};

const MapPage = () => {
  const [viewState, setViewState] = useState<any>();
  const [isPropertyModalActive, setIsPropertyDrawerActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<GeoJSON | null>(
    null
  );
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
    console.log(viewState);
  }, [viewState]);

  const openPropertyDetails = (property: any) => {
    setSelectedProperty(property);
    setIsPropertyDrawerActive(true);
  };

  return (
    <div className="flex mx-0 w-full">
      <StyledDrawer
        variant="permanent"
        className="w-1/3 bg-white"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar />
        {
          <PropertyFilter>
            {/* <PropertyList properties={properties} /> */}
          </PropertyFilter>
        }
      </StyledDrawer>
      <MapContainer className="flex-1 shrink-0 map-container w-2/3">
        <MapComponent
          lat={userCoordinates?.lat ?? +MANILA_LATITUDE}
          lng={userCoordinates?.lng ?? +MANILA_LONGITUDE}
          viewStateHandler={(viewStateEventPayload) =>
            setViewState(viewStateEventPayload)
          }
        >
          {Markers(openPropertyDetails)}
          {isPropertyModalActive && selectedProperty && (
            <StyledPopup
              anchor="bottom"
              closeOnClick={true}
              onClose={() => {
                setIsPropertyDrawerActive(!isPropertyModalActive);
              }}
              latitude={
                +selectedProperty?.geometry.coordinates[1] ?? +MANILA_LATITUDE
              }
              longitude={
                +selectedProperty?.geometry.coordinates[0] ?? +MANILA_LONGITUDE
              }
            >
              <PropertyCard
                property={selectedProperty.properties}
                lat={selectedProperty.geometry.coordinates[1]}
                lng={selectedProperty.geometry.coordinates[0]}
              />
            </StyledPopup>
          )}
        </MapComponent>
      </MapContainer>
    </div>
  );
};

export { MapPage };

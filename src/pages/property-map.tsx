import styled from "styled-components";
import { FC, useState, useEffect } from "react";
import ReactMap, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

import { THEME_COLORS } from "../constants";
import { PropertyFilter, PropertyCard, PropertyList } from "../components";
import {
  MAPBOX_PUBLIC_TOKEN,
  data,
  MANILA_LATITUDE,
  GeoJSON,
  MANILA_LONGITUDE,
} from "../constants";

const dummmyData = JSON.parse(JSON.stringify(data));
const properties = dummmyData.features;

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
      {properties.map((property: GeoJSON, index: number) => {
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
      })}
    </>
  );
};

const MapComponent: FC<Coordinates> = ({ children, lat, lng }) => {
  return (
    <ReactMap
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 10,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
    >
      {children}
    </ReactMap>
  );
};

const MapPage = () => {
  const [isPropertyModalActive, setIsPropertyDrawerActive] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<GeoJSON | null>(
    null
  );
  const drawerWidth = "50%";
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

  const openPropertyDetails = (property: any) => {
    setSelectedProperty(property);
    setIsPropertyDrawerActive(true);
  };

  return (
    <div className="flex mx-0 w-full">
      <StyledDrawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Toolbar />
        {
          <PropertyFilter>
            <PropertyList properties={properties} />
          </PropertyFilter>
        }
      </StyledDrawer>
      <MapContainer className="flex-1 shrink-0 map-container w-1/2">
        <MapComponent
          lat={userCoordinates?.lat ?? +MANILA_LATITUDE}
          lng={userCoordinates?.lng ?? +MANILA_LONGITUDE}
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

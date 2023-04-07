import { FC, useRef, useMemo, useEffect, useState } from "react";
import ReactMap, { Marker, Popup } from "react-map-gl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import mapboxgl from "mapbox-gl";

// eslint-disable-next-line
(mapboxgl as any).workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

import { MAPBOX_PUBLIC_TOKEN, Coordinates } from "../../constants";

export const MapComponent: FC<
  Coordinates & {
    viewStateHandler: (value: any) => void;
    onClick: any;
    properties: any;
    onHoverOnMarker?: any;
    activeProperty: any;
    mapRef: any;
  }
> = ({
  lat,
  lng,
  viewStateHandler,
  onClick,
  onHoverOnMarker,
  properties,
  activeProperty,
  mapRef,
}) => {
  // * Philippine Area of Responsibility
  // const mapRef = useRef<MapRef | null>(null);
  const style = useRef<any>();
  const [hoveredProperty, setHoveredProperty] = useState<any>(null);
  const initialViewState = useRef<any>({
    longitude: lng,
    latitude: lat,
    zoom: 4,
  });
  let formatter = Intl.NumberFormat("en", { notation: "compact" });

  useEffect(() => {
    style.current = {
      maxWidth: "100%",
      width: "100%",
      minWidth: "100%",
      minHeight: "100px",
      flexGrow: "1",
    };
  }, []);

  const renderPopup = useMemo(() => {
    if (hoveredProperty) {
      const { geojson } = hoveredProperty;
      const { properties } = geojson;
      const latitude = hoveredProperty.geojson.geometry.coordinates[1];
      const longitude = hoveredProperty.geojson.geometry.coordinates[0];
      return (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setHoveredProperty(null)}
        >
          <Grid container direction="column">
            <Grid item container direction="column">
              <Typography variant="body2" fontWeight={800}>
                Type:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {properties.type}
              </Typography>
            </Grid>
            <Grid item container direction="column">
              <Typography variant="body2" fontWeight={800}>
                Min. Buyer Income:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {properties.minimumBuyerIncome.replace(/ /g, "")}
              </Typography>
            </Grid>
          </Grid>
        </Popup>
      );
    }
    return null;
  }, [hoveredProperty]);

  const renderMarkers = useMemo(() => {
    if (properties && properties.length) {
      return properties.map((property: any, index: number) => {
        const onClickHandler = () => {
          onClick(property);
        };
        const latitude = property.geojson.geometry.coordinates[1];
        const longitude = property.geojson.geometry.coordinates[0];
        const price =
          property.geojson.properties.minimumSellingPrice.replace(
            /[, ]+/g,
            ""
          ) ?? "0";
        return (
          <Marker
            key={"marker-" + index}
            latitude={latitude}
            longitude={longitude}
          >
            <div
              className="flex justify-center items-center shadow-lg rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={onClickHandler}
              style={{
                width: "64px",
                background:
                  activeProperty?.pk === property.pk ? "#1e293b" : "white",
                height: "32px",
                color: activeProperty?.pk === property.pk ? "white" : "black",
                touchAction: "none",
              }}
              onMouseEnter={() => setHoveredProperty(property)}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              <Typography fontWeight={600} fontSize={14}>
                &#8369;{formatter.format(Number(price))}
              </Typography>
            </div>
          </Marker>
        );
      });
    } else {
      return <></>;
    }
  }, [properties, activeProperty]);

  return (
    <ReactMap
      initialViewState={initialViewState.current}
      ref={mapRef}
      mapLib={window.mapboxgl}
      onMoveEnd={viewStateHandler}
      style={style.current}
      mapStyle="mapbox://styles/mapbox/streets-v12?optimize=true"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      maxZoom={18}
      minZoom={3}
    >
      {renderMarkers}
      {renderPopup}
    </ReactMap>
  );
};

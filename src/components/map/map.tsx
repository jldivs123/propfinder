import { FC, useRef, useMemo, useState, useCallback, useEffect } from "react";
import ReactMap, { Marker, MapRef } from "react-map-gl";
import { getAreaOfPolygon, getCenterOfBounds, convertArea } from "geolib";
import Typography from "@mui/material/Typography";

import { MAPBOX_PUBLIC_TOKEN, Coordinates } from "../../constants";
import { calculateGeohashPrecision, useDebounce } from "../../utils";

export const MapComponent: FC<
  Coordinates & {
    viewStateHandler: (value: any) => void;
    onClick: any;
    properties: any;
    activeProperty: any;
    mapRef: any;
  }
> = ({
  lat,
  lng,
  viewStateHandler,
  onClick,
  properties,
  activeProperty,
  mapRef,
}) => {
  // * Philippine Area of Responsibility
  // const mapRef = useRef<MapRef | null>(null);
  const style = useRef<any>();
  const initialViewState = useRef<any>({
    longitude: lng,
    latitude: lat,
    zoom: 4,
  });
  // const [viewState, setViewState] = useState<any>();
  // const debouncedViewState = useDebounce(viewState, 500);
  // const stateHandler = useCallback((value: any) => {
  // setViewState(value.viewState);
  // }, []);
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

  const markers = useMemo(() => {
    if (properties && properties.length) {
      return properties.map((property: any, index: number) => {
        const onClickHandler = () => onClick(property);
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
              onClick={onClickHandler}
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
      });
    } else {
      return <></>;
    }
  }, [properties]);

  // useEffect(())

  // useMemo(() => {
  //   const map = mapRef.current;
  //   if (map) {
  //     const bounds: any = map.getMap()?.getBounds();
  //     // * `polygon` variable represents the rectangular area
  //     const polygon: any = [
  //       [bounds._ne.lat, bounds._sw.lng],
  //       [bounds._ne.lat, bounds._ne.lng],
  //       [bounds._sw.lat, bounds._ne.lng],
  //       [bounds._sw.lat, bounds._sw.lng],
  //     ];
  //     const area = convertArea(getAreaOfPolygon(polygon), "km2");
  //     const center = getCenterOfBounds(polygon);
  //     const precision = calculateGeohashPrecision(area);
  //     viewStateHandler({
  //       lat: center.longitude,
  //       lng: center.latitude,
  //       precision,
  //     });
  //   }
  // }, [viewStateHandler]);

  return (
    <ReactMap
      initialViewState={initialViewState.current}
      ref={mapRef}
      onMoveEnd={viewStateHandler}
      style={style.current}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
      maxZoom={18}
      minZoom={3}
    >
      {markers}
    </ReactMap>
  );
};

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FaceIcon from "@mui/icons-material/Face";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import ReactMap, { Marker } from "react-map-gl";
import Typography from "@mui/material/Typography";

import {
  MAPBOX_PUBLIC_TOKEN,
  MANILA_LATITUDE,
  MANILA_LONGITUDE,
  PropertyDetail,
} from "../../constants";
import { PropertySpec, ImageObj } from "./elements";

import { TrimString } from "../../utils";

const FEATURES = [
  { name: "Bedrooms", value: 6, reverse: true },
  { name: "Price per sqm", value: 14000, reverse: true },
  { name: "Bathrooms", value: 2, reverse: true },
  { name: "Lot size", value: "146sqm", reverse: true },
  { name: "Floor size", value: "120sqm", reverse: true },
  { name: "Type", value: "Row House", reverse: true },
  { name: "City", value: "Manila", reverse: true },
];

export const Property = (propertyDetails: PropertyDetail) => {
  const {
    address,
    selling_price: price,
    type: propertyType,
    lot_area: lotArea,
    floor_area: floorArea,
    title_number: titleNumber,
    appraisal_date: appraisalDate,
    remarks,
  } = propertyDetails;
  console.log(lotArea);
  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 1000,
          flexGrow: { sm: 1, md: 2, lg: 2 },
          width: "auto",

          paddingRight: "10px",
        }}
      >
        {/* TODO
        
        1, Address and property specs
        2. Offeror
        3. Property short description
        4. Features & Amenities
        5. Map
        6. Estimated Cost
        7. Near establishments
        */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>{propertyType}</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {address}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "24px",
              margin: "24px 0",
            }}
          >
            {PropertySpec({ title: "Bed", value: 2 })}
            {PropertySpec({ title: "Bathroom", value: 2 })}
            {PropertySpec({
              title: "Lot Size",
              value: TrimString(lotArea) + "sqm",
            })}
            {PropertySpec({
              title: "Floor size",
              value: floorArea ? +TrimString(floorArea) + "sqm" : "NA",
            })}
          </Box>
        </Box>
        <Divider />
        <Box></Box>
        <Divider />
        <Box
          sx={{
            margin: "12px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            About this home
          </Typography>
          <Typography>
            Cozy Room in Boracay for just sa minute away from the Beach. Work in
            paradise book our place to experience the island life.
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "12px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Offer Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,

              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "45%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <CalendarTodayIcon
                sx={{
                  marginRight: "5px",
                  width: 46,
                  height: 46,
                }}
              />
              {PropertySpec({
                title: "Listing Date",
                value: "March 14, 2022",
                reverse: true,
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "45%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <FaceIcon
                sx={{
                  marginRight: "5px",
                  width: 46,
                  height: 46,
                }}
              />
              {PropertySpec({
                title: "Listed by",
                value: "Juan Dela Cruz",
                reverse: true,
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "45%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  marginRight: "5px",
                  width: 46,
                  height: 46,
                }}
              />
              {PropertySpec({
                title: "Remarks",
                value: "Unoccupied",
                reverse: true,
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "45%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <ErrorOutlineIcon
                sx={{
                  marginRight: "5px",
                  width: 46,
                  height: 46,
                }}
              />
              {PropertySpec({
                title: "Status",
                value: "Active",
                reverse: true,
              })}
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "12px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Facts & Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {FEATURES.map((feature: any) => {
              const { name: title, value, reverse } = feature;
              return (
                <Box sx={{ width: "30%", margin: "10px" }}>
                  {PropertySpec({ title, value, reverse })}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "12px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Location
          </Typography>
          <Box
            sx={{
              maxHeight: 300,
              margin: "10px 0",
            }}
          >
            <ReactMap
              initialViewState={{
                longitude: +MANILA_LONGITUDE,
                latitude: +MANILA_LATITUDE,
                zoom: 10,
              }}
              style={{ width: "100%", height: "300px" }}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxAccessToken={MAPBOX_PUBLIC_TOKEN}
            >
              <Marker
                key={"markerSampleKey"}
                latitude={+MANILA_LATITUDE}
                longitude={+MANILA_LONGITUDE}
              >
                <img
                  src={"/Home_4.png"}
                  onClick={() => {
                    console.log("Clicked");
                  }}
                />
              </Marker>
            </ReactMap>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "12px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nearby Establishments
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,

              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "45%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <SchoolIcon
                sx={{
                  marginRight: "5px",
                  width: 46,
                  height: 46,
                }}
              />
              {PropertySpec({
                title: "Schools",
                value: "McKinley High",
                reverse: true,
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: { sm: "none", md: "flex" },
          borderRadius: "16px",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 0,
          minWidth: 275,
          height: "auto",
          maxHeight: 250,
          position: "sticky",
          top: 84,
          padding: "24px",
          elevation: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          {PropertySpec({ title: "Listing Price", value: price })}
          {PropertySpec({
            title: "Title no.",
            value: TrimString(titleNumber),
          })}
        </Box>
        <Button variant="outlined">Start an offer</Button>
        <Button variant="contained">Take a tour</Button>
        <Button variant="contained">Virtual tour</Button>
      </Box>
    </Box>
  );
};

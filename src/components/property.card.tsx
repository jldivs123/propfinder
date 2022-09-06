import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { GeoJSON, DUMMY_IMAGE, PropertyDetail } from "../constants";

interface IPropertyDetailCard {
  type: string;
  address: string;
  price: string;
  floorArea?: number;
  lotArea?: number;
  numOfRoom?: number;
  imgUrls?: string[];
  withVirtualTour?: boolean;
  onClick: () => void;
}

export function PropertyDetailCard(props: IPropertyDetailCard) {
  const theme = useTheme();
  const {
    type,
    address,
    price,
    floorArea,
    lotArea,
    numOfRoom,
    imgUrls,
    withVirtualTour,
    onClick,
  } = props;
  const formattedPrice = price.replace(/ /g, "");

  return (
    <Card
      onClick={onClick}
      sx={{
        bgcolor: "#fff",
        borderRadius: "24px",
        cursor: "pointer",
        maxWidth: 345,
        boxShadow: "none",
        filter:
          "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
      }}
      className="h-full w-80 rounded-2xl"
    >
      <CardMedia
        component="img"
        image={DUMMY_IMAGE}
        alt="Property image"
        className="rounded-2xl mx-auto my-2.5"
        sx={{
          width: "94%",
        }}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          <b>
            <span>&#8369;</span>
            {formattedPrice}
          </b>
        </Typography>
        <Typography component="div" variant="body1">
          {type}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            {floorArea && floorArea > 0
              ? `Floor area: ${floorArea} sq/m`
              : "N/A"}{" "}
            &#183;
            {lotArea ? ` Lot area: ${lotArea} sq/m` : "N/A"}
          </Typography>
        </Box>
        {/* &nbsp;
        <Typography variant="body2" className="mt-0.5">
          <LocationOnIcon />
          {address}
        </Typography> */}
      </CardContent>
    </Card>
  );
}

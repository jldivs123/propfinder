import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
  floorSize?: number;
  lotSize?: number;
  numOfRoom?: number;
  imgUrls?: string[];
  withVirtualTour?: boolean;
  onClick: () => void;
}

const numberGenerator = (type: "room" | "area") => {
  return type === "room"
    ? Math.floor(Math.random() * 3) + 1
    : Math.floor(Math.random() * 40) + 27;
};

export function PropertyDetailCard(props: IPropertyDetailCard) {
  const theme = useTheme();
  const {
    type,
    address,
    price,
    floorSize,
    lotSize,
    numOfRoom,
    imgUrls,
    withVirtualTour,
    onClick,
  } = props;

  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        bgcolor: "#fff",
        borderRadius: "16px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>
              <span>&#8369;</span>
              {price.replace(/" "/g, "")}
            </b>
          </Typography>
          <Typography component="div" variant="body1">
            {type}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">
              {numberGenerator("room")} Bedroom/s
            </Typography>
            <Typography variant="body2">
              {numberGenerator("room")} Bathroom/s
            </Typography>
            <Typography variant="body2">
              {numberGenerator("area")} sqm
            </Typography>
          </Box>
          <Typography variant="body2">
            <LocationOnIcon />
            {address}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex" }}>
          {lotSize && <AspectRatioIcon>lotSize</AspectRatioIcon>}
          {floorSize && <MapsHomeWorkIcon>floorSize</MapsHomeWorkIcon>}
          {numOfRoom && <MeetingRoomIcon>numOfRoom</MeetingRoomIcon>}
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="play/pause">
            <PanoramaPhotosphereIcon />
          </IconButton>
          <IconButton aria-label="next">
            <ContactsIcon />
          </IconButton>
        </Box> */}
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={DUMMY_IMAGE}
        alt="Property image"
      />
    </Card>
  );
}

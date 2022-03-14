import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PanoramaPhotosphereIcon from "@mui/icons-material/PanoramaPhotosphere";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LinkIcon from "@mui/icons-material/Link";
import ContactsIcon from "@mui/icons-material/Contacts";

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
}

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
  } = props;

  return (
    <Card sx={{ display: "flex", bgcolor: "#fff" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {type}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <b>{price}</b> <span>&#8212;</span> {address}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex" }}>
          {lotSize && <AspectRatioIcon>lotSize</AspectRatioIcon>}
          {floorSize && <MapsHomeWorkIcon>floorSize</MapsHomeWorkIcon>}
          {numOfRoom && <MeetingRoomIcon>numOfRoom</MeetingRoomIcon>}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            <LinkIcon />
          </IconButton>
          <IconButton aria-label="play/pause">
            <PanoramaPhotosphereIcon />
          </IconButton>
          <IconButton aria-label="next">
            <ContactsIcon />
          </IconButton>
        </Box>
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

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import {
  PropertyDetail,
  GOOGLE_STREETVIEW_URL,
  MISSING_PROPERTY_IMG,
} from "../constants";

export const PropertyCard: React.FC<{
  property: any;
  lat: number;
  lng: number;
}> = (props) => {
  const { property, lat, lng } = props;
  const streetViewURL = GOOGLE_STREETVIEW_URL.replace(
    "latitude",
    `${lat}`
  ).replace("longitude", `${lng}`);
  const marketPrice = property?.minimumSellingPrice?.replace(/ /g, "");

  return (
    <Card sx={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        alt="Property image"
        height="140"
        image={MISSING_PROPERTY_IMG}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {property.remarks}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          <span>&#8369;</span>
          {marketPrice}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "uppercase" }}
        >
          {property.rawAddress}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={streetViewURL} target="_blank">
          View
        </Link>
      </CardActions>
    </Card>
  );
};

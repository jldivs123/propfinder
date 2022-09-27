import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FcHome } from "react-icons/fc";

import { MISSING_PROPERTY_IMG } from "../constants";

interface IPropertyDetailCard {
  type: string;
  address: string;
  price: string;
  floorArea?: number;
  lotArea?: number;
  numOfRoom?: number;
  imgUrls?: string[];
  withVirtualTour?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}

function CardImagePlaceholder() {
  // * https://dev.to/franciscomendes10866/how-to-create-modern-cards-using-react-and-tailwind-2ded
  return (
    <div
      className="flex flex-col justify-center items-center bg-gradient-to-t m-auto my-2 rounded-2xl mx-auto my-2.5 h-48"
      style={{ width: "94%" }}
    >
      <CardMedia
        component="img"
        image={MISSING_PROPERTY_IMG}
        alt="Property image"
        className="h-100 w-100"
        sx={{
          width: "100%",
        }}
      />
      <Typography className="text-white" color="primary">
        No image available.
      </Typography>
    </div>
  );
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
    onHover,
  } = props;
  const formattedPrice = price.replace(/ /g, "");

  return (
    <Card
      onClick={onClick}
      onMouseEnter={onHover}
      sx={{
        bgcolor: "#fff",
        borderRadius: "24px",
        cursor: "pointer",
        maxWidth: 345,
        boxShadow: "none",
        filter:
          "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
      }}
      className="h-full w-80 group rounded-2xl hover:bg-slate-800 hover:text-white transition"
    >
      {!imgUrls && CardImagePlaceholder()}
      {imgUrls && (
        <CardMedia
          component="img"
          image={MISSING_PROPERTY_IMG}
          alt="Property image"
          sx={{
            width: "94%",
          }}
        />
      )}
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          className="group-hover:text-white"
          component="div"
        >
          <b>
            <span>&#8369;</span>
            {formattedPrice}
          </b>
        </Typography>
        <Typography component="div" variant="body1">
          {type}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            className="group-hover:text-white"
          >
            {floorArea && floorArea > 0
              ? `Floor area: ${floorArea} sq/m`
              : "N/A"}{" "}
            &#183;
            {lotArea ? ` Lot area: ${lotArea} sq/m` : "N/A"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MdBookmark from "@mui/icons-material/Bookmark";
import { CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useLiveQuery } from "dexie-react-hooks";
import Skeleton from "react-loading-skeleton";

import { MISSING_PROPERTY_IMG } from "../constants";
import { db } from "./../lib/db";

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
  property?: any;
  isLoading?: boolean;
}

function CardImagePlaceholder(onClick?: () => void) {
  // * https://dev.to/franciscomendes10866/how-to-create-modern-cards-using-react-and-tailwind-2ded
  return (
    <div
      className="flex flex-col justify-center text-center items-center rounded-2xl h-48 m-0"
      style={{ width: "100%", cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        image={MISSING_PROPERTY_IMG}
        alt="Property image"
        className="h-100 w-100 p-0"
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
    property,
    isLoading,
  } = props;
  const isBookmarked = useLiveQuery(() => {
    return db.savedProperties.where("pk").equals(property.pk).toArray();
  });
  const formattedPrice = price.replace(/ /g, "");

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isBookmarked?.length) {
      return db.savedProperties.delete(property.pk);
    }
    return db.savedProperties.add(property);
  };

  return (
    <Card
      onClick={onClick}
      onMouseEnter={onHover}
      sx={{
        bgcolor: "#fff",
        borderRadius: "24px",
        maxWidth: "98%",
        minWidth: "45%",
        maxHeight: 400,
        position: "relative",
        border: "2px solid #5A5A5A",
        boxShadow: "none",
        filter:
          "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
      }}
      className="h-full w-80 group rounded-2xl hover:bg-slate-800 hover:text-white transition"
    >
      <CardActionArea>
        {!imgUrls && !isLoading && CardImagePlaceholder(onClick)}
        {imgUrls && !isLoading && (
          <CardMedia
            component="img"
            image={MISSING_PROPERTY_IMG}
            alt="Property image"
            onClick={onClick}
            sx={{
              width: "94%",
              cursor: "pointer",
            }}
          />
        )}
        {isLoading && (
          <Skeleton
            style={{ width: "92%", margin: "12px 4%" }}
            className="flex flex-col rounded-2xl h-48 mx-auto"
          />
        )}
        <CardContent
          sx={{
            flex: "1 0 auto",
            padding: "0 1rem 1rem 1rem",
          }}
        >
          <Grid container direction="column">
            {isLoading && <Skeleton count={2} />}
            {!isLoading && (
              <Grid container item justifyContent="center" alignItems="center">
                <Grid item xs={10}>
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
                </Grid>
                <Grid item xs={2}>
                  <CardActions>
                    <IconButton
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={handleBookmarkClick}
                      aria-label="settings"
                    >
                      <MdBookmark
                        color={isBookmarked?.length ? "primary" : "disabled"}
                      />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
            )}
            {!isLoading && (
              <Typography component="div" variant="body1">
                {type}
              </Typography>
            )}
            {!isLoading && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="group-hover:text-white"
                >
                  {floorArea && floorArea > 0
                    ? `Floor area: ${floorArea} sq/m`
                    : "Floor area: N/A"}{" "}
                  &#183;
                  {lotArea ? ` Lot area: ${lotArea} sq/m` : "N/A"}
                </Typography>
              </Box>
            )}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

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

import { MISSING_PROPERTY_IMG } from "../constants";
import { db } from "./../lib/db";

interface IPropertyDetailCard {
  type: string;
  address: string;
  rawAddress?: string;
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
  location?: any;
}

function CardImagePlaceholder(location?: any) {
  // * https://dev.to/franciscomendes10866/how-to-create-modern-cards-using-react-and-tailwind-2ded

  return (
    <div
      className="flex flex-col justify-center text-center items-center rounded-2xl h-80 m-0"
      style={{ width: "100%", height: "auto", cursor: "pointer" }}
    >
      {" "}
      {location && (
        <iframe
          width="100%"
          className="h-80 w-100 p-0 object-contain"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyAgVnGRrGmfaAJCVzRh-TzbtdIfrKIjw8I
          &location=${location}`}
        />
      )}
      {!location && (
        <>
          <CardMedia
            component="img"
            image={MISSING_PROPERTY_IMG}
            alt="Property image"
            className="h-100 w-100 p-0 object-contain"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
          <Typography className="text-white" color="primary">
            No image available.
          </Typography>
        </>
      )}
    </div>
  );
}

export function PropertyDetailCard(props: IPropertyDetailCard) {
  const {
    type,
    rawAddress,
    price,
    floorArea,
    lotArea,
    imgUrls,
    onClick,
    onHover,
    property,
    isLoading,
  } = props;
  const { geojson: { geometry: { coordinates = null } = null } = null } =
    property;
  const location = property ? `${coordinates[1]},${coordinates[0]}` : null;
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
        height: "auto",
        boxShadow:
          "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
      }}
      className="h-full group rounded-2xl hover:bg-slate-800 hover:text-white transition"
    >
      <CardActionArea component="span">
        <Grid container direction="column" className="h-auto" columns={12}>
          <Grid item container xs={8}>
            {!imgUrls && !isLoading && CardImagePlaceholder(location)}
            {imgUrls && !isLoading && (
              <CardMedia
                component="img"
                image={MISSING_PROPERTY_IMG}
                alt="Property image"
                onClick={onClick}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                }}
              />
            )}
          </Grid>
          <Grid item container xs={4}>
            <CardContent
              sx={{
                flex: "1 0 auto",
                padding: "0 1rem 1rem 1rem",
                maxWidth: "100%",
              }}
            >
              <Grid container direction="column">
                <Grid
                  container
                  item
                  justifyContent="center"
                  direction="row"
                  alignItems="center"
                >
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
                <Typography component="div" variant="body1">
                  {type}
                </Typography>
                <Box
                  flexDirection="column"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "90%",
                    padding: "0 5px",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="group-hover:text-white max-w-86 truncate"
                  >
                    {rawAddress}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="group-hover:text-white"
                  >
                    {floorArea && floorArea > 0
                      ? `Floor area: ${floorArea} sq/m`
                      : "Floor area: N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="group-hover:text-white"
                  >
                    {lotArea ? ` Lot area: ${lotArea} sq/m` : "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

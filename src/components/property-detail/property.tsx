import { useState } from "react";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import SellIcon from "@mui/icons-material/Sell";
import TitleIcon from "@mui/icons-material/Title";
import CommentIcon from "@mui/icons-material/Comment";
import CampaignIcon from "@mui/icons-material/Campaign";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import { useLiveQuery } from "dexie-react-hooks";
import MdBookmark from "@mui/icons-material/Bookmark";
import Alert from "@mui/material/Alert";

import { db } from "../../lib/db";

export function DetailHeader(property: any) {
  // * Check this link out for tiled images: https://github.com/christikaes/react-image-masonry
  const {
    property: {
      pk = "",
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  const isBookmarked = useLiveQuery(() => {
    return db.savedProperties.where("pk").equals(pk).toArray();
  });

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isBookmarked?.length) {
      return db.savedProperties.delete(pk);
    }
    return db.savedProperties.add(property.property);
  };

  return (
    <Card
      className="rounded-2xl"
      sx={{
        borderRadius: "12px",
        backgroundColor: "transparent",
        width: "100%",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        height="240"
        sx={{ maxHeight: "480px" }}
        className=""
        image="/undraw_for_sale_re_egkk.svg"
        alt="homepage-property-images"
      />
      <CardContent>
        <Grid container justifyContent="space-between" columns={12}>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "800",
                margin: "1rem 0",
                marginLeft: "-1rem",
              }}
            >
              {type}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            justifyContent="flex-end"
          >
            <IconButton
              onMouseDown={(event) => event.stopPropagation()}
              onClick={handleBookmarkClick}
              aria-label="settings"
            >
              <MdBookmark
                color={isBookmarked?.length ? "primary" : "disabled"}
              />
            </IconButton>
          </Grid>
        </Grid>

        <Typography variant="body2" color="text" sx={{ fontSize: "1.2rem" }}>
          <span>
            <FmdGoodIcon fontSize="large" color="primary" />
          </span>{" "}
          {rawAddress}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function DetailSummary(property: any) {
  const {
    property: {
      geojson: {
        properties: {
          minimumSellingPrice,
          lotArea = "N/A",
          floorArea = "N/A",
          titleCode = "N/A",
          tctStatus = "N/A",
          remark = "N/A",
        } = null,
      } = null,
    } = null,
  } = property;

  return (
    <Card
      sx={{
        borderRadius: "12px",
        backgroundColor: "transparent",
        padding: 0,
      }}
      elevation={0}
    >
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ lg: 2 }}>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              About this property:
            </Typography>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <SellIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Base Price
              </Typography>
              <Typography variant="h6" component="div">
                &#8369;
                {minimumSellingPrice
                  ? `${minimumSellingPrice.replace(/ /g, "")}`
                  : 0}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <TitleIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Title number
              </Typography>
              <Typography variant="h6" component="div">
                {titleCode}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <OpenInFullIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Floor Area
              </Typography>
              <Typography variant="h6" component="div">
                {+floorArea ? `${floorArea}sq/m` : floorArea}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <SettingsOverscanIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Lot Area
              </Typography>
              <Typography variant="h6" component="div">
                {+lotArea ? `${lotArea}sq/m` : lotArea}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CommentIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                Remarks
              </Typography>
              <Typography variant="h6" component="div">
                {remark}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} md={6}>
            <Grid
              item
              container
              xs={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <CampaignIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={10}>
              <Typography
                sx={{ fontSize: "1rem" }}
                color="text.secondary"
                gutterBottom
              >
                TCT Status
              </Typography>
              <Typography variant="h6" component="div">
                {tctStatus}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DetailDescription(property: any) {
  const {
    property: {
      geojson: { properties: { description = "N/A" } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "transparent",
      }}
    >
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ lg: 2 }}>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DetailMap(property: any) {
  const {
    property: {
      geojson: {
        properties: { rawAddress = null, type = null } = null,
        geometry: { coordinates = null } = null,
      } = null,
    } = null,
  } = property;
  const location = `${coordinates[1]},${coordinates[0]}`;
  const [viewType, setViewType] = useState<"street" | "default">("street");

  const toggleView = () => {
    setViewType(viewType === "street" ? "default" : "street");
  };

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: "100%",
        backgroundColor: "transparent",
      }}
      className="shadow-xl"
    >
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ lg: 2 }}>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              Where's your next property at:
            </Typography>
            <Alert severity="info" sx={{ margin: "1rem 0" }}>
              If you're seeing a black screen, it means Google doesn't have
              street view available for that area.
            </Alert>
          </Grid>
          <Grid item xs={12} lg={12}>
            {viewType === "street" ? (
              <iframe
                width="100%"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyAgVnGRrGmfaAJCVzRh-TzbtdIfrKIjw8I
          &location=${location}`}
              ></iframe>
            ) : (
              <iframe
                width="100%"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAgVnGRrGmfaAJCVzRh-TzbtdIfrKIjw8I
        &q=${location}`}
              ></iframe>
            )}
          </Grid>
          <Grid item xs={12} lg={12} sx={{ marginTop: "1rem " }}>
            <Button variant="contained" onClick={toggleView}>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ fontSize: "1rem" }}
              >
                Toggle view
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DetailAuthor(property: any) {
  const {
    property: {
      geojson: {
        properties: {
          branchInfo: {
            dropboxLocation = null,
            offerDuration = null,
            branch = null,
            batchNumber = null,
          } = {},
        } = null,
      } = null,
    } = null,
  } = property;

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "transparent",
      }}
    >
      <CardContent>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ lg: 2 }}
          justifyContent="flex-start"
          justifyItems="flex-start"
        >
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                margin: "1rem 0",
              }}
            >
              Where you'll be bidding:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", marginTop: "1rem" }}
            >
              <Typography fontWeight={600} color="primary">
                Branch Name
              </Typography>{" "}
              {branch}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", marginTop: "1rem" }}
            >
              <Typography fontWeight={600} color="primary">
                Dropbox Location/s
              </Typography>{" "}
              {dropboxLocation}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", marginTop: "1rem" }}
            >
              <Typography fontWeight={600} color="primary">
                Offer Duration
              </Typography>{" "}
              {offerDuration}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", marginTop: "1rem" }}
            >
              <Typography fontWeight={600} color="primary">
                Batch Number
              </Typography>{" "}
              {batchNumber}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function DetailAuthorCard(property: any) {
  const {
    property: {
      geojson: {
        properties: {
          minimumBuyerIncome = null,
          geocodedData: { results = null } = null,
          branchInfo: { offerDuration = null, documentUrl = null } = {},
        } = null,
      } = null,
    } = null,
  } = property;

  const visitPagIbig = () => {
    const url = documentUrl
      ? documentUrl
      : "https://www.pagibigfund.gov.ph/acquiredassets.html";

    window.open(url, "_blank")?.focus();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "15px",
        backgroundColor: "transparent",
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        border: "1px solid #DDDDDD",
      }}
    >
      {/* <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3WYPb9P3tVFFr4UQjNPMxB6jEg2BJC4KbjhHY43pOw&s"
      /> */}
      <CardContent>
        <Grid container className="w-100" columns={12}>
          <Grid item xs={6}>
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              fontWeight="font-light"
            >
              Min. Buyer income
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
              }}
            >
              &#8369;{minimumBuyerIncome ? `${minimumBuyerIncome}` : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom variant="caption" component="div">
              Confidence{" "}
              <span>
                <Tooltip
                  title="Confidence refers to how accurate our system thinks about this property's coordinates."
                  sx={{ width: "14px" }}
                >
                  <InfoIcon></InfoIcon>
                </Tooltip>
              </span>
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{
                fontWeight: "bold",
              }}
            >
              <Rating
                color="primary"
                name="read-only"
                defaultValue={0}
                precision={0.5}
                value={results ? results[0].confidence / 2 : 0}
                readOnly
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          className="w-100 my-1 border-dotted border-2 border-indigo-600 rounded-lg"
          columns={12}
        >
          <Grid item xs={12} sx={{ borderBottom: "1px solid #6d65fb" }}>
            <Typography
              variant="caption"
              component="div"
              textAlign="center"
              fontWeight="font-light"
            >
              Offer Duration
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              textAlign="center"
              fontWeight={700}
            >
              {offerDuration ?? "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          onClick={visitPagIbig}
          size="large"
          variant="contained"
          sx={{ width: "100%", margin: "5px 5px 1rem 5px" }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

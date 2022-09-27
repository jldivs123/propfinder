import { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function DetailHeader(property: any) {
  // * Check this link out for tiled images: https://github.com/christikaes/react-image-masonry
  const {
    property: {
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      className="rounded-2xl bg-white"
      sx={{
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      }}
    >
      <CardMedia
        component="img"
        height="240"
        sx={{ maxHeight: "480px" }}
        className=""
        image="https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            fontWeight: "bold",
            background: "-webkit-linear-gradient(45deg, #ec407a, #6a1b9a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {type}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1rem" }}
        >
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
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
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
                background: "-webkit-linear-gradient(45deg, #c22ed0, #5ffae0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About this property:
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6}>
            <Typography
              sx={{ fontSize: "1rem" }}
              color="text.secondary"
              gutterBottom
            >
              Base Price
            </Typography>
            <Typography variant="h6" component="div">
              {minimumSellingPrice}
            </Typography>
          </Grid>
          <Grid item xs={6} lg={6}>
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
          <Grid item xs={6} lg={6}>
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
          <Grid item xs={6} lg={6}>
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
          <Grid item xs={6} lg={6}>
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
          <Grid item xs={6} lg={6}>
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
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
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
                background: "-webkit-linear-gradient(45deg, #0ccda3, #c1fcd3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              {description !== "N/A"
                ? description
                : `PAG-IBIG FUND RESERVES THE RIGHT TO REJECT ANY OR ALL BIDS, TO WAIVE ANY FORMALITY THEREIN OR ACCEPT SUCH BIDS AS MAY BE CONSIDERED MOST ADVANTAGEOUS TO THE FUND. THE DECISION OF THE FUND IS FINAL AND BINDING`}
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
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      }}
      className="shadow-xl"
    >
      <CardContent>
        <iframe
          width="100%"
          height="450"
          loading="lazy"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAgVnGRrGmfaAJCVzRh-TzbtdIfrKIjw8I
          &q=Space+Needle,Seattle+WA"
        ></iframe>
      </CardContent>
      <CardActions>
        <Button variant="contained">View on 3D street map</Button>
      </CardActions>
    </Card>
  );
}

export function DetailAuthor(property: any) {
  const {
    property: {
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
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
                background: "-webkit-linear-gradient(45deg, #f9957f, #f2f5d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About the Author
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1rem" }}
            >
              The Home Development Mutual Fund, commonly known as the Pag-IBIG
              Fund, is a government-owned and controlled corporation under the
              Department of Human Settlements and Urban Development of the
              Philippines responsible for the administration of the national
              savings program and affordable shelter financing for Filipinos
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
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN3WYPb9P3tVFFr4UQjNPMxB6jEg2BJC4KbjhHY43pOw&s"
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            background: "-webkit-linear-gradient(45deg, #a3c9e2, #9618f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Author: PAG-IBIG
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1rem" }}
        >
          The Home Development Mutual Fund, commonly known as the Pag-IBIG Fund,
          is a government-owned and controlled corporation under the Department
          of Human Settlements and Urban Development of the Philippines
          responsible for the administration of the national savings program and
          affordable shelter financing for Filipinos
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

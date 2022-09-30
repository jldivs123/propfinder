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
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        height="240"
        sx={{ maxHeight: "480px" }}
        className=""
        image="/undraw_for_sale_re_egkk.svg"
        alt="homer-property-images"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{
            fontWeight: "800",
          }}
        >
          {type}
        </Typography>
        <Typography variant="body2" color="text" sx={{ fontSize: "1.2rem" }}>
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
      elevation={0}
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
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
              }}
            >
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
              {description !== "N/A"
                ? description
                : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula purus sit amet iaculis cursus. Sed a massa nec arcu interdum iaculis. Nulla eleifend leo sit amet arcu rhoncus finibus. Fusce varius sem eget nulla bibendum posuere nec at ex. Proin blandit dolor et velit efficitur, vel maximus quam tincidunt. Cras maximus a tortor eu lacinia. Phasellus in sem id nisi tincidunt mattis. Morbi fermentum, dui id pellentesque tempus, est purus laoreet nibh, vitae fermentum urna diam malesuada enim. Mauris vitae faucibus nulla. Maecenas nulla massa, lobortis vitae nisl non, aliquet convallis leo. Vestibulum sed magna viverra, maximus orci at, fermentum est.

                In porttitor mauris nec faucibus auctor. Aenean viverra tempus erat, nec auctor quam consequat sit amet. Sed vel magna lectus. Morbi eget lorem interdum, vestibulum tellus in, lobortis lectus. Donec vitae orci nulla. Morbi id nulla vel mi pharetra mollis. Suspendisse justo elit, placerat eget sapien a, posuere posuere turpis. Vestibulum placerat leo quis pellentesque sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus finibus dolor id arcu pretium gravida. Curabitur commodo sit amet elit et tempus. Praesent malesuada felis vitae erat vehicula, et ullamcorper turpis condimentum. Proin sed diam id tortor maximus pulvinar. Curabitur eu luctus mauris. Praesent sapien sapien, molestie sed metus eu, sodales semper nibh.
                
                Curabitur et auctor urna. Aenean vel quam fringilla, bibendum metus id, consectetur neque. In ultrices nec libero ac maximus. Vestibulum varius nibh turpis, a aliquet ex dignissim vitae. Nulla rutrum orci mauris, et feugiat urna mattis vel. Nullam placerat orci vitae justo egestas, varius elementum purus iaculis. Curabitur gravida sollicitudin lectus et cursus. Integer tincidunt ipsum urna, blandit tincidunt quam sodales eget. Mauris sagittis, elit ac accumsan finibus, risus elit venenatis magna, eu consequat mi libero ac arcu. Etiam risus nulla, rhoncus tincidunt porta sed, efficitur ac justo. Duis fringilla feugiat tellus, ultricies laoreet enim blandit sit amet. Praesent eu dapibus diam, sit amet semper ligula. Morbi lectus felis, consequat at odio et, finibus tincidunt massa. Suspendisse sed fermentum arcu. Aenean est sapien, volutpat vel dui eget, feugiat semper mauris. Integer dignissim id lorem molestie vehicula.`}
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
      elevation={0}
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
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
              }}
            >
              Logistics
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <iframe
              width="100%"
              height="450"
              loading="lazy"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAgVnGRrGmfaAJCVzRh-TzbtdIfrKIjw8I
          &q=Space+Needle,Seattle+WA"
            ></iframe>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Button variant="contained">
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ fontSize: "1rem" }}
              >
                View on 3D street map
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
      geojson: { properties: { rawAddress = null, type = null } = null } = null,
    } = null,
  } = property;

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: 275,
        borderRadius: "12px",
        backgroundColor: "white",
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
              }}
            >
              About the Author
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="body2" sx={{ fontSize: "1rem" }}>
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
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
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
          }}
        >
          Author: PAG-IBIG
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "1rem" }}>
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

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { PropertyDetailCard } from "../components";

function NoProperties() {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignContent="center"
    >
      <img
        src="./404.svg"
        alt="No properties found"
        loading="lazy"
        style={{ width: "40%" }}
      />
      <Typography
        fontWeight={600}
        color="primary"
        variant="subtitle1"
        textAlign="center"
        style={{ width: "40%" }}
      >
        Awww, no properties found in this area.
      </Typography>
    </Grid>
  );
}

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
  disablePrevButton: boolean;
  disableNextButton: boolean;
  handleNextButtonClicked?: () => void;
  handlePreviousButtonClicked?: () => void;
}> = (props) => {
  const {
    properties,
    onHover,
    disablePrevButton,
    disableNextButton,
    handleNextButtonClicked,
    handlePreviousButtonClicked,
  } = props;
  const visitProperty = (propertyId: string) => {
    window.open(`/properties/${propertyId}`, "_blank");
  };
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      columns={12}
      className="h-100 w-100"
      justifyContent="flex-start"
      direction="column"
      sx={{
        padding: "0",
        margin: 0,
        width: "100%",
        height: "100%",
        minHeight: "100%",
        flexGrow: 1,
      }}
    >
      <Grid
        item
        container
        columnSpacing={2}
        spacing={2}
        className="grow p-2"
        sx={{
          margin: 0,
          padding: "4rem 0",
          width: "100%",
          minHeight: "100%",
        }}
        flexGrow={1}
        flexShrink={0}
        columns={12}
      >
        {!properties?.length && <NoProperties />}
        {!!properties?.length &&
          properties.map((property: any, index: number) => {
            const propertyData = property.geojson.properties;
            const props = {
              price: propertyData.minimumSellingPrice ?? 0,
              ...propertyData,
              property,
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                xl={4}
                container
                justifyContent="center"
                alignItems="flex-start"
                key={`${propertyData.address}-${index}`}
                onMouseEnter={() => onHover(property)}
                onMouseLeave={() => onHover(null)}
                sx={{
                  margin: 0,
                  padding: "1rem !important",
                }}
              >
                <PropertyDetailCard
                  onClick={() => visitProperty(property.pk)}
                  {...props}
                  id={property.pk}
                  style={{ maxWidth: "98%", maxHeight: "98%" }}
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        flexGrow={0}
        flexShrink={1}
        height="3rem"
      >
        <Button
          color="primary"
          aria-label="previous"
          onClick={handlePreviousButtonClicked}
          startIcon={<NavigateBeforeIcon />}
          disabled={disablePrevButton}
        >
          Previous
        </Button>
        <Button
          color="primary"
          aria-label="next"
          onClick={handleNextButtonClicked}
          endIcon={<NavigateNextIcon />}
          disabled={disableNextButton}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

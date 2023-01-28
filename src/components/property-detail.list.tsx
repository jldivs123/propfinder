import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { PropertyDetailCard } from "../components";

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
      className="grow h-100"
      justifyContent="center"
      direction="column"
      sx={{ padding: "0", margin: 0, width: "100%", border: "1px solid green" }}
    >
      <Grid
        item
        container
        columnSpacing={2}
        spacing={2}
        className="grow p-2"
        sx={{
          height: "100%",
          margin: 0,
          padding: "4rem 0.5rem",
          width: "100%",
          border: "1px solid red",
        }}
        columns={12}
      >
        {!properties?.length && "No properties in this area"}
        {properties?.length &&
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
                alignItems="center"
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
                  style={{ maxWidth: "98%", maxHeight: "98%" }}
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid item container justifyContent="center" className="grow-0 shrink-0">
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

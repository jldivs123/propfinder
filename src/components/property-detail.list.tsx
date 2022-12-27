import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
  itemsPerPage: number;
}> = (props) => {
  const { properties, onHover, itemsPerPage } = props;
  const visitProperty = (propertyId: string) => {
    window.open(`/properties/${propertyId}`, "_blank");
  };
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      columns={12}
      className="grow min-h-full"
      justifyContent="center"
      direction="column"
    >
      <Grid
        item
        container
        columnSpacing={2}
        className="grow"
        rowSpacing={2}
        columns={12}
        sx={{ padding: "2rem" }}
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
                xs={6}
                xl={4}
                container
                justifyContent="center"
                alignItems="center"
                key={`${propertyData.address}-${index}`}
                onMouseEnter={() => onHover(property)}
                onMouseLeave={() => onHover(null)}
                sx={{ margin: 0, padding: 0, maxWidth: "345px" }}
              >
                <PropertyDetailCard
                  onClick={() => visitProperty(property.pk)}
                  {...props}
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        className="border border-red-600 grow-0 shrink-0"
      >
        <Button
          color="primary"
          aria-label="previous"
          startIcon={<NavigateBeforeIcon />}
        >
          Previous
        </Button>
        <Button
          color="primary"
          aria-label="next"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

import * as React from "react";
import Grid from "@mui/material/Grid";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
}> = (props) => {
  const { properties, onHover } = props;

  const visitProperty = (propertyId: string) => {
    window.open(`/properties/${propertyId}`, "_blank");
  };
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      columns={12}
      className="grow"
      justifyContent="center"
      sx={{ padding: "2rem" }}
    >
      {properties.map((property: any, index: number) => {
        const propertyData = property.geojson.properties;
        const props = {
          price: propertyData.minimumSellingPrice ?? 0,
          ...propertyData,
          property,
        };
        return (
          <Grid
            item
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
  );
};

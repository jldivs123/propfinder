import * as React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
}> = (props) => {
  const { properties, onHover } = props;
  const navigate = useNavigate();

  const visitProperty = (propertyId: string, property: any) => {
    console.log(properties);
    navigate("/properties/" + propertyId, { state: property });
  };
  return (
    <Grid
      container
      spacing={{ xs: 4, md: 4 }}
      columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}
      className="grow"
      justifyContent="center"
      sx={{ padding: "2rem" }}
    >
      {properties.map((property: any, index: number) => {
        const propertyData = property.geojson.properties;
        const props = {
          price: propertyData.minimumSellingPrice ?? 0,
          ...propertyData,
        };
        return (
          <Grid
            lg={6}
            md={6}
            sm={2}
            xs={4}
            item
            container
            justifyContent="center"
            alignItems="center"
            key={`${propertyData.address}-${index}`}
            onMouseEnter={() => onHover(property)}
            onMouseLeave={() => onHover(null)}
            sx={{ margin: 0, padding: 0 }}
          >
            <PropertyDetailCard
              onClick={() => visitProperty(props.pk, property)}
              {...props}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

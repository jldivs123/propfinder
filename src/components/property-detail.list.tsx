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
    navigate("/properties/" + propertyId, { state: property });
  };
  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      className="flex flex-row grow overflow-hidden p-4"
    >
      {properties.map((property: any, index: number) => {
        const propertyData = property.geojson.properties;
        const props = {
          price: propertyData.minimumSellingPrice ?? 0,
          ...propertyData,
        };
        return (
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            key={`${propertyData.address}-${index}`}
            className="flex w-1/2 my-2.5"
            onMouseEnter={() => onHover(property)}
            onMouseLeave={() => onHover(null)}
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

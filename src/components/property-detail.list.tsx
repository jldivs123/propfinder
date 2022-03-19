import * as React from "react";
import Box from "@mui/material/Box";

import { GeoJSON } from "../constants";
import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{ properties: Array<GeoJSON> }> = (
  props
) => {
  const { properties } = props;
  return (
    <Box sx={{ width: "100%", bgcolor: "#FFF" }}>
      {properties.map((property) => {
        const propertyData = property.properties;
        const props = { price: propertyData.selling_price, ...propertyData };
        return (
          <Box
            sx={{
              boxShadow: 2,
              width: "98%",
              margin: "10px 5px",
              padding: 0,
              bgcolor: "#white",
              borderRadius: "16px",
              display: "flex",
            }}
          >
            <PropertyDetailCard {...props} />
          </Box>
        );
      })}
    </Box>
  );
};

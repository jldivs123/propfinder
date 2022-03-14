import * as React from "react";
import styled from "styled-components";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

import { GeoJSON, DUMMY_IMAGE, PropertyDetail } from "../constants";
import { PropertyDetailCard } from "../components";

const Wrapper = styled.div`
  border: 2px solid;
`;

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

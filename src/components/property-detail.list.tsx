import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{ properties: Array<any> }> = (props) => {
  const { properties } = props;
  const navigate = useNavigate();

  const visitProperty = (propertyId: string, property: any) => {
    navigate("/properties/" + propertyId);
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "#FFF" }}>
      {properties.map((property) => {
        const propertyData = property.geojson.properties;
        const props = {
          price: propertyData.minimumSellingPrice ?? 0,
          ...propertyData,
        };
        return (
          <Box
            key={propertyData.address}
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
            <PropertyDetailCard
              onClick={() => visitProperty(props.address, propertyData)}
              {...props}
            />
          </Box>
        );
      })}
    </Box>
  );
};

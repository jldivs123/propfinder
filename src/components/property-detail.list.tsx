import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{ properties: Array<any> }> = (props) => {
  const { properties } = props;
  const navigate = useNavigate();

  const visitProperty = (propertyId: string, property: any) => {
    navigate("/properties/" + propertyId, { state: property });
  };
  return (
    <Box className="flex flex-row grow flex-wrap pt-3 h-full overflow-y-scroll w-full pl-3 content-between justify-between">
      {properties.map((property: any) => {
        const propertyData = property.geojson.properties;
        const props = {
          price: propertyData.minimumSellingPrice ?? 0,
          ...propertyData,
        };
        return (
          <Box key={propertyData.address} className="flex w-1/2 my-2.5">
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

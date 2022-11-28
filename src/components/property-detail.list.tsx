import { useState } from "react";
import Grid from "@mui/material/Grid";
import ReactPaginate from "react-paginate";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
  itemsPerPage: number;
}> = (props) => {
  const { properties, onHover, itemsPerPage } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = properties.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(properties.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % properties.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={20}
        pageCount={pageCount}
        previousLabel="< previous"
      />
    </Grid>
  );
};

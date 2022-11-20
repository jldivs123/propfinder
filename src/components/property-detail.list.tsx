import * as React from "react";
import Grid from "@mui/material/Grid";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { PropertyDetailCard } from "../components";

export const PropertyList: React.FC<{
  properties: Array<any>;
  onHover: (property: any) => void;
  loadMoreItems: () => void;
  isItemLoaded: (index: number) => boolean;
}> = (props) => {
  const { properties, onHover, loadMoreItems, isItemLoaded } = props;

  const visitProperty = (propertyId: string) => {
    window.open(`/properties/${propertyId}`, "_blank");
  };

  const Row = (props: any) => {
    const { index, style, isItemLoaded } = props;
    console.log("HALLOW", index);
    let label;
    if (isItemLoaded) {
      label = `Row ${index}`;
    } else {
      label = "Loading...";
    }
    return (
      <div className="ListItem" style={style}>
        {label}
        {isItemLoaded}
      </div>
    );
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
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={1000}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            className="List"
            height={150}
            itemCount={1000}
            itemSize={30}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={300}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </Grid>
  );
};

// export const PropertyList: React.FC<{
//   properties: Array<any>;
//   onHover: (property: any) => void;
// }> = (props) => {
//   const { properties, onHover } = props;

//   const visitProperty = (propertyId: string) => {
//     window.open(`/properties/${propertyId}`, "_blank");
//   };
//   return (
//     <Grid
//       container
//       columnSpacing={2}
//       rowSpacing={2}
//       columns={12}
//       className="grow"
//       justifyContent="center"
//       sx={{ padding: "2rem" }}
//     >
//       {properties.map((property: any, index: number) => {
//         const propertyData = property.geojson.properties;
//         const props = {
//           price: propertyData.minimumSellingPrice ?? 0,
//           ...propertyData,
//           property,
//         };
//         return (
//           <Grid
//             item
//             container
//             justifyContent="center"
//             alignItems="center"
//             key={`${propertyData.address}-${index}`}
//             onMouseEnter={() => onHover(property)}
//             onMouseLeave={() => onHover(null)}
//             sx={{ margin: 0, padding: 0, maxWidth: "345px" }}
//           >
//             <PropertyDetailCard
//               onClick={() => visitProperty(property.pk)}
//               {...props}
//               isLoading={true}
//             />
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };

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
    const { index, style, isItemLoaded, data: property } = props;
    console.log("HALLOW", props);
    const isLoaded = isItemLoaded(index);
    return (
      isLoaded &&
      property && (
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          key={`-${index}`}
          onMouseEnter={() => onHover(property)}
          onMouseLeave={() => onHover(null)}
          sx={{ margin: 0, padding: 0, maxWidth: "345px", ...style }}
        >
          <PropertyDetailCard
            onClick={() => visitProperty(property.pk)}
            {...props}
            isLoading={true}
          />
        </Grid>
      )
    )(!isLoaded && <div>Loading...</div>);
  };

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      columns={12}
      className="grow border border-red-600"
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
            className="List flex-grow"
            height={150}
            itemCount={1000}
            itemSize={30}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width="100%"
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

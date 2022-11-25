import * as React from "react";
import Grid from "@mui/material/Grid";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { PropertyDetailCard } from "../components";

interface PropertyScrollerProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: any;
  loadNextPage: any;
}

export function PropertyScroller({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}: PropertyScrollerProps) {
  const { results = [] } = { ...items };
  const itemCount = hasNextPage ? results.length + 1 : results.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < results.length;

  const Item = ({ index, style }: any) => {
    let isItemLoading = !isItemLoaded(index);

    return (<PropertyDetailCard>)
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className="List flex-grow"
          height={150}
          itemCount={1000}
          itemSize={30}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width="100%"
        >
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

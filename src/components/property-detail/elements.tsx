import styled from "styled-components";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useScreenSize } from "../../utils";

export interface ImageObj {
  url?: string;
  title?: string;
}

export const randomRoom = () => {
  const rooms = ["Kitchen", "Bedroom", "Bathroom", "Living room"];
  return rooms[Math.floor(Math.random() * rooms.length)];
};

const StyledImg = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const FEATURES = [
  { name: "Bedrooms", value: 6, reverse: true },
  { name: "Price per sqm", value: 14000, reverse: true },
  { name: "Bathrooms", value: 2, reverse: true },
  { name: "Lot size", value: "146sqm", reverse: true },
  { name: "Floor size", value: "120sqm", reverse: true },
  { name: "Type", value: "Row House", reverse: true },
  { name: "City", value: "Manila", reverse: true },
];

const ESTABLISHMENTS = [];

const renderRooms = (images: any[]) => {
  return images.map((imageObj: any) => {
    return (
      <Box
        sx={{ display: "flex", maxHeight: 400, minHeight: 400, width: "1 / 4" }}
      >
        <StyledImg src={imageObj.url} alt={imageObj.title} />
      </Box>
    );
  });
};

interface QuiltedImageListProps {
  images: ImageObj[];
}

export const getQuiltedImageSize = (index: number) => {
  switch (index) {
    case 0:
      return { colSize: 2, rowSize: 4 };
    default:
      return { colSize: 1, rowSize: 2 };
  }
};

export const QuiltedImageList = (props: QuiltedImageListProps) => {
  const { images } = props;
  let slicedImages = images.length > 5 ? images.slice(0, 5) : images;
  return (
    <ImageList
      sx={{ width: "100%", height: "100%" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {slicedImages.map((item, index) => {
        const { colSize, rowSize } = getQuiltedImageSize(index);
        return (
          <ImageListItem key={item.url} cols={colSize} rows={rowSize}>
            <img src={item.url} alt={item.title} loading="lazy" />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export const Gallery = (images: ImageObj[]) => {
  return (
    <>
      <QuiltedImageList images={images} />
      <Button
        variant="contained"
        size="small"
        sx={{ position: "absolute", right: 20, bottom: 10 }}
      >
        View all photos
      </Button>
    </>
  );
};

export const ImageListComponent = (images: any[]) => {
  const screenSize = useScreenSize();
  return (
    <>
      {/* Mobile */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
      {/* Tablet */}
      <Box
        sx={{
          display: { xs: "none", md: "flex", lg: "none" },
          position: "relative",
        }}
      >
        {Gallery(images)}
      </Box>
      {/* Desktop */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "none",
            width: "100%",
            lg: "flex",
            overflow: "clip",
            borderRadius: "16px",
            position: "relative",
          },
        }}
      >
        {Gallery(images)}
      </Box>
    </>
  );
};

export const PropertySpec = (props: {
  title: string;
  value: string | number;
  reverse?: boolean;
}) => {
  const { title, value, reverse } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ fontSize: 14, fontWeight: reverse ? "700" : "normal" }}>
        {title}
      </Typography>
      <Typography sx={{ fontWeight: reverse ? "normal" : "700" }}>
        {value}
      </Typography>
    </Box>
  );
};

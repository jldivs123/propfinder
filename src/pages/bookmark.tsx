import { useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/db";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    description: "Property title",
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.geojson.properties.titleCode || ""}`,
  },
  { field: "author", headerName: "Author", width: 70 },
  {
    field: "offerType",
    headerName: "Offer Type",
    description: "",
    sortable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.propertyType || ""}`,
  },
  {
    field: "type",
    headerName: "Type",
    description: "Property type",
    sortable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.geojson.properties.type || ""}`,
  },
  {
    field: "minSellingPrice",
    headerName: "Min. Price",
    description: "Minimum selling price",
    sortable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.geojson.properties.minimumSellingPrice || ""}`,
  },
  {
    field: "remark",
    headerName: "Remark",
    description: "",
    sortable: true,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.geojson.properties.remark || ""}`,
  },
  {
    field: "address",
    headerName: "Address",
    description: "",
    sortable: true,
    width: 480,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.geojson.properties.rawAddress || ""}`,
  },
];

export const BookMarkPage = () => {
  const bookmarkedProperties = useLiveQuery(() => db.savedProperties.toArray());

  useEffect(() => {
    console.log(bookmarkedProperties);
  }, [bookmarkedProperties]);

  return (
    <Container
      style={{
        flexGrow: 1,
        maxWidth: "100%",
        padding: "4rem 0px",
      }}
    >
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={12}
        height="100%"
      >
        <Grid item xs={8} md={8} lg={8} xl={8}>
          <Stack sx={{ height: "100%" }} spacing={2}>
            <Typography variant="h5">Properties you bookmarked.</Typography>
            <DataGrid
              getRowId={(row) => row.pk}
              rows={bookmarkedProperties ?? []}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

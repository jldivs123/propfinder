import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useLiveQuery } from "dexie-react-hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { PropertyDetailCard } from "../components";
import { db } from "../lib/db";

export const BookMarkPage = () => {
  const bookmarkedProperties = useLiveQuery(() => db.savedProperties.toArray());
  const navigate = useNavigate();

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
            <Typography variant="h4" fontWeight={800} color="#2e2e40">
              Properties you bookmarked.
            </Typography>
            <Grid
              container
              columns={12}
              columnSpacing={2}
              rowSpacing={2}
              justifyContent="center"
            >
              {bookmarkedProperties &&
                bookmarkedProperties.map((bookmarkProperty) => {
                  const {
                    geojson: {
                      properties: {
                        type,
                        address,
                        minimumSellingPrice,
                        floorArea,
                        lotArea,
                        numOfRoom,
                      },
                    },
                  } = bookmarkProperty;
                  return (
                    <Grid
                      item
                      sx={{ margin: 0 }}
                      className="w-80"
                      key={bookmarkProperty?.pk}
                    >
                      <PropertyDetailCard
                        type={type}
                        address={address}
                        price={minimumSellingPrice}
                        floorArea={floorArea}
                        lotArea={lotArea}
                        numOfRoom={numOfRoom}
                        onClick={() =>
                          navigate(`/properties/${bookmarkProperty.pk}`)
                        }
                        property={bookmarkProperty}
                      ></PropertyDetailCard>
                    </Grid>
                  );
                })}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

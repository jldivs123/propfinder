import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Puff } from "react-loader-spinner";

import {
  DetailHeader,
  DetailAuthor,
  DetailMap,
  DetailAuthorCard,
  DetailSummary,
  DetailDescription,
} from "../components/property-detail";
import { getProperty } from "../lib/apis";

const Wrapper = styled.div`
  margin: auto;
  padding: 1rem;
  width: 100%;
  background-color: transparent;
  display: flex;
`;

export const PropertyDetailPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  // const property = state as any;
  const {
    response: property,
    isLoading,
    invokeApi: getPropertyData,
  } = getProperty(id ?? "");

  useEffect(() => {
    getPropertyData();
  }, [id]);

  return (
    <Wrapper>
      <Container maxWidth="lg" className="py-2">
        {!isLoading && property && (
          <Grid
            container
            className="w-full w-100 grow"
            height="auto"
            spacing={3}
            sx={{ border: "1px solid black" }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item container xs={12} sx={{ border: "1px solid blue" }}>
              <DetailHeader property={property} />
            </Grid>
            <Grid
              item
              xs={12}
              container
              spacing={2}
              sx={{
                border: "1px solid green",
                maxWidth: "100%",
                width: "100%",
                margin: 0,
              }}
            >
              <Grid
                item
                container
                xs={12}
                lg={8}
                className="max-w-100"
                sx={{ border: "1px solid violet", maxWidth: "100%" }}
              >
                <Grid
                  item
                  xs={12}
                  container
                  className="position-relative max-w-100"
                  sx={{ border: "1px solid violet" }}
                >
                  <Grid item xs={12}>
                    <DetailSummary property={property} />
                  </Grid>
                  <Grid item xs={12}>
                    <DetailDescription property={property} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                lg={4}
                container
                direction="column"
                alignItems="center"
                sx={{ position: "relative" }}
              >
                <Box sx={{ position: "sticky", top: "5rem" }}>
                  <DetailAuthorCard property={property} />
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              className="w-100"
              sx={{ border: "1px solid yellow" }}
            >
              <DetailMap property={property} />
            </Grid>
            <Grid item xs={12} sx={{ border: "1px solid violet" }}>
              <DetailAuthor property={property} />
            </Grid>
          </Grid>
        )}
        {isLoading && <Puff />}
      </Container>
    </Wrapper>
  );
};

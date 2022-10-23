import styled from "styled-components";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import {
  DetailHeader,
  DetailAuthor,
  DetailMap,
  DetailAuthorCard,
  DetailSummary,
  DetailDescription,
} from "../components/property-detail";

const Wrapper = styled.div`
  margin: auto;
  padding: 1rem;
  width: 100%;
  background-color: transparent;
  display: flex;
`;

export const PropertyDetailPage = () => {
  const { id: address } = useParams();
  const { state } = useLocation();
  const property = state as any;

  return (
    <Wrapper>
      <Container maxWidth="lg" className="py-2">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            className="w-full w-100 grow"
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          >
            <Grid item xs={12} md={12}>
              <DetailHeader property={property} />
            </Grid>
            <Grid item xs={12} md={12} lg={12} container spacing={2}>
              <Grid item xs={8} md={12} lg={8}>
                <Grid
                  item
                  xs={12}
                  lg={12}
                  container
                  className="position-relative max-w-100"
                  spacing={2}
                >
                  <Grid item lg={12} xs={12}>
                    <DetailSummary property={property} />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <DetailDescription property={property} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={4} sx={{ position: "relative" }}>
                <Box sx={{ position: "sticky", top: "5rem" }}>
                  <DetailAuthorCard property={property} />
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DetailMap property={property} />
            </Grid>
            <Grid item xs={12}>
              <DetailAuthor property={property} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Wrapper>
  );
};

import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/map");
  }

  return (
    <Container sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Stack
        sx={{ width: "100%" }}
        className="h-full"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item lg={6} md={6} sm={12}>
            <Typography
              variant="h1"
              fontWeight="bold"
              fontSize="1rem"
              className="prose md:prose-lg lg:prose-xl"
            >
              Property catalog made with{" "}
              <span style={{ color: "#6d65fb" }}>love</span> &{" "}
              <span style={{ color: "#6d65fb" }}>caffeine.</span>
            </Typography>
            <Typography
              variant="h1"
              fontWeight="bold"
              fontSize={{ xs: "3rem", sm: "3.5rem", md: "5rem" }}
              className="prose md:prose-lg lg:prose-xl"
              color="#2e2e40"
            >
              Finding a home shouldn't be hard.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              onClick={handleClick}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: "1.5rem", sm: "1rem", md: "24px" }}
                fontWeight="800"
              >
                Start looking.
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            display={{ sm: "block", xs: "block", md: "block" }}
          >
            <img
              src="/undraw_choosing_house_re_1rv7.svg"
              alt="homepage-image"
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className="w-6/12"
          spacing={4}
          sx={{ marginTop: "1.5rem", width: "50%" }}
        >
          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                color="primary"
                fontWeight={600}
                align="center"
              >
                2,000+
              </Typography>
              <Typography variant="body2" align="center">
                Properties listed
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                color="primary"
                fontWeight={600}
                align="center"
              >
                100%
              </Typography>
              <Typography variant="body2" align="center">
                Free
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                color="primary"
                fontWeight={600}
                align="center"
              >
                Automatic
              </Typography>
              <Typography variant="body2" align="center">
                Updates
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

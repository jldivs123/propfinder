import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
              fontSize={{ xs: "4rem", sm: "4rem", md: "6rem" }}
              className="prose md:prose-lg lg:prose-xl"
            >
              Finding a home shouldn't be hard.
            </Typography>
            <Button variant="contained" disableElevation onClick={handleClick}>
              <Typography
                variant="h4"
                fontSize={{ xs: "1.5rem", sm: "2rem", md: "2rem" }}
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
            display={{ sm: "none", xs: "none", md: "block" }}
          >
            <img src="/undraw_map_re_60yf.svg" alt="homer-image" />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

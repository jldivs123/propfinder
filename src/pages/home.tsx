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
    <Container
      sx={{
        flexGrow: 1,
        maxWidth: "100%",
        height: "auto",
      }}
    >
      <Stack
        sx={{ width: "100%" }}
        className="h-full"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          rowSpacing={5}
          columns={12}
          columnSpacing={{ xs: 2 }}
          flexGrow={1}
          height="auto"
          sx={{
            flexGrow: 1,
            marginTop: { xs: "2rem", md: 0 },
            minHeight: { xs: "70vh", md: "30vh" },
          }}
          direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
        >
          <Grid
            item
            container
            md={6}
            xs={4}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Typography
              variant="h1"
              fontWeight="semibold"
              fontSize="1rem"
              className="prose md:prose-lg lg:prose-xl"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              Property catalog made with{" "}
              <span style={{ color: "#6d65fb" }}>love</span> &{" "}
              <span style={{ color: "#6d65fb" }}>caffeine.</span>
            </Typography>
            <Typography
              variant="h1"
              fontWeight="bold"
              fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem" }}
              sx={{ display: "flex", flexDirection: "column" }}
              textAlign={{ xs: "center", md: "left" }}
              className="prose md:prose-lg lg:prose-xl"
              color="#2e2e40"
            >
              <span>Finding a home</span>
              <span>shouldn't be hard.</span>
            </Typography>
            <Typography
              fontWeight="semibold"
              fontSize="0.90rem"
              textAlign={{ xs: "center", md: "left" }}
            >
              Find your perfect property with ease using our user-friendly
              catalog, a simpler alternative to traditional property search
              methods.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleClick}
              sx={{
                borderRadius: "15px",
                marginTop: "1rem",
              }}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: "1rem", sm: "1rem", md: "1rem" }}
                fontWeight="800"
              >
                Start looking.
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            md={6}
            xs={6}
            display={{ sm: "block", xs: "block", md: "block" }}
          >
            <img
              src="/undraw_choosing_house_re_1rv7.svg"
              alt="homepage-image"
            />
          </Grid>
        </Grid>
        {/* Stats */}
        <Grid
          item
          container
          direction={{ md: "row", xs: "column" }}
          className="w-6/12"
          columns={12}
          sx={{ marginTop: "1.5rem", width: { xs: "100%", lg: "50%" } }}
        >
          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h4"
                component="div"
                fontSize={{ xs: "1.5rem", md: "1.5rem" }}
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
                fontSize={{ xs: "1.5rem", md: "1.5rem" }}
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
                fontSize={{ xs: "1.5rem", md: "1.5rem" }}
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

import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
      <Grid
        sx={{
          minWidth: "100%",
          minHeight: "80vh",
          height: "auto",
        }}
        alignContent="center"
        direction="column"
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
          sx={{
            flexGrow: 1,
            marginTop: { xs: "1rem", md: 0 },
            minHeight: { xs: "50vh", md: "70vh" },
            height: "auto",
            marginBottom: { xs: "2rem", md: 0 },
            maxWidth: "100% !important",
            marginLeft: "0 !important",
          }}
          direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
        >
          <Grid
            item
            container
            md={6}
            xs={4}
            height="30vh"
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
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem 0",
              }}
              textAlign={{ xs: "center", md: "left" }}
              className="prose md:prose-lg lg:prose-xl"
              color="#2e2e40"
            >
              <span>Finding a home </span>
              <span>shouldn't be hard.</span>
            </Typography>
            <Typography
              fontWeight="semibold"
              fontSize="0.90rem"
              textAlign={{ xs: "center", md: "left" }}
            >
              Find a perfect home with ease using our user-friendly catalog, no
              need to go over dozens of PDFs from PAG-IBIG.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleClick}
              size="large"
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
            container
            md={6}
            xs={6}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "auto",
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: "370px", md: "60vh" },
              }}
              src="/undraw_choosing_house_re_1rv7.svg"
              alt="homepage-image"
            />
          </Grid>
        </Grid>
        {/* Stats */}
        <Grid
          item
          container
          className="w-6/12"
          columns={12}
          direction={{ xs: "column", md: "row" }}
          sx={{
            marginTop: "1rem",
            width: { xs: "100%", lg: "50%" },
            height: "auto",
            flexWrap: "nowrap",
            margin: "auto",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              marginBottom: { xs: "1.5rem", md: "0" },
              width: { xs: "100%", md: "inherit" },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="div"
                fontSize={{ xs: "1.5rem", md: "1.5rem" }}
                color="primary"
                fontWeight={600}
                align="center"
              >
                1,000+
              </Typography>
              <Typography variant="body2" align="center">
                Properties listed
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              marginBottom: { xs: "1.5rem", md: "0" },
              width: { xs: "100%", md: "inherit" },
            }}
          >
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
          <Grid
            item
            xs={4}
            sx={{
              marginBottom: { xs: "1.5rem", md: "0" },
              width: { xs: "100%", md: "inherit" },
            }}
          >
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
      </Grid>
    </Container>
  );
}

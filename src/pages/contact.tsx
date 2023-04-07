import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export function ContactPage() {
  return (
    <Container
      style={{
        flexGrow: 1,
        maxWidth: "100%",
        padding: "4rem 0px",
        backgroundColor: "#e5e5f7",
        opacity: "1",
        backgroundImage:
          "radial-gradient(#444cf7 1.35px, transparent 1.35px), radial-gradient(#444cf7 1.35px, #e5e5f7 1.35px)",
        backgroundSize: "54px 54px",
        backgroundPosition: "0 0,27px 27px",
      }}
    >
      {" "}
      <Grid
        container
        justifyContent="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        columns={12}
        height="100%"
      >
        <Grid
          container
          item
          xs={12}
          lg={8}
          direction="column"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          justifyItems="center"
        >
          <Grid
            item
            container
            alignItems="center"
            alignContent="center"
            justifyContent="center"
            justifyItems="center"
          >
            <Typography
              sx={{
                typography: { xs: "h2", md: "h1" },
                fontWeight: { xs: 600, lg: 800 },
              }}
              textAlign="center"
            >
              Get in touch
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            height="auto"
            columns={12}
          >
            <Grid
              item
              container
              xs={2}
              sx={{ margin: "5px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  height: "240px",
                  width: "240px",
                  boxShadow:
                    "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                }}
                className="h-full group rounded-2xl"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  height="100%"
                >
                  {" "}
                  <IconButton
                    color="primary"
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/jldivs/",
                        "_blank"
                      )
                    }
                    sx={{ height: "5rem", width: "5rem" }}
                  >
                    <LinkedInIcon sx={{ height: "5rem", width: "5rem" }} />
                  </IconButton>
                  <Grid item container direction="column">
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      textAlign="center"
                    >
                      LinkedIn:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      jldivs
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid
              item
              container
              xs={2}
              sx={{ margin: "5px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  height: "240px",
                  width: "240px",
                  boxShadow:
                    "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                }}
                className="h-full group rounded-2xl"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  height="100%"
                >
                  {" "}
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      window.location.href = "mailto:jldivs.scarriot@gmail.com";
                      // e.preventDefault();
                    }}
                    sx={{ height: "5rem", width: "5rem" }}
                  >
                    <EmailIcon sx={{ height: "5rem", width: "5rem" }} />
                  </IconButton>
                  <Grid item container direction="column">
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      textAlign="center"
                    >
                      Email:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      jldivs.scarriot@gmail.com
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid
              item
              container
              xs={2}
              sx={{ margin: "5px" }}
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "24px",
                  height: "240px",
                  width: "240px",
                  boxShadow:
                    "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
                }}
                className="h-full group rounded-2xl"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  height="100%"
                >
                  <IconButton
                    color="primary"
                    sx={{ height: "5rem", width: "5rem" }}
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="5rem"
                      height="5rem"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                  </IconButton>
                  <Grid item container direction="column">
                    <Typography
                      variant="body2"
                      fontWeight={800}
                      textAlign="center"
                    >
                      Discord:
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      Not Available.
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;

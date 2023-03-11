import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export function StoryPage() {
  return (
    <Container
      style={{
        flexGrow: 1,
        maxWidth: "100%",
        padding: "4rem 0px",
        background: "#",
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
          md={8}
          lg={6}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            columns={12}
            xs={12}
            justifyContent="center"
          >
            <Typography
              variant="h1"
              sx={{
                typography: { xs: "h2", md: "h1" },
                fontWeight: { xs: 800, lg: 800 },
                margin: "20px 0",
              }}
              textAlign="center"
            >
              The Story
            </Typography>
            <Grid
              item
              container
              sx={{ width: { xs: "90%", lg: "100%" }, margin: "20px 0px" }}
            >
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  display: "block",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                <span
                  style={{
                    fontSize: "48px",
                    paddingTop: "24px",
                    position: "relative",
                  }}
                >
                  H
                </span>
                ey there, my name is JL, and I'm a software developer from the
                Philippines. I have a side-project that I'm excited to share
                with you today. It's called Scarriot, and it's a platform that
                makes it easy for people to browse and bookmark properties
                online.
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                Let me tell you a little bit about why I created Scarriot. Last
                year, when my friend and I were looking for properties to buy,
                we opted for foreclosed properties because we didn't have much
                capital. We were pointed to PAG-IBIG, as they auctioned
                properties. However, we quickly realized that the website was
                outdated and difficult to use. The property listings were in PDF
                format, which meant we had to manually search for the
                properties' addresses. It was frustrating and time-consuming.
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                That's when I decided to create Scarriot. I wanted to build a
                platform that would provide a better user experience than
                PAG-IBIG. Scarriot is a hybrid of Airbnb and
                Amazon/Lazada/Shopee. It allows you to browse properties and add
                them to your "cart" (or bookmark in Scarriot's case).{" "}
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                One of the key features of Scarriot is that all properties
                listed on the platform are geolocated and pinned on a map. This
                means that you can easily see the location of each property and
                how it relates to other properties in the area.
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                Additionally, the list of properties is auto-magically updated
                every week, so you can be sure that you're seeing the latest
                listings.
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                If you had the same frustrating experience that my friend and I
                had when using PAG-IBIG, then I'm sure you're going to love
                Scarriot. It's a platform designed with the user in mind, and
                we've worked hard to make it as easy and intuitive to use as
                possible.
              </Typography>
              <br />
              <br />
              <br />
              <Typography
                fontSize={{
                  xs: "18px",
                  lg: "20px",
                  fontFamily: `source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif;`,
                }}
                variant="caption"
              >
                So, if you're on the hunt for a new property, whether it's for
                buying or renting, I invite you to check out Scarriot. Happy
                house-hunting!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StoryPage;

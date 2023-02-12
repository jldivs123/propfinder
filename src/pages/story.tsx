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
          lg={8}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              variant="h1"
              fontWeight={{ xs: 600, lg: 800 }}
              textAlign="center"
            >
              The Story
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StoryPage;

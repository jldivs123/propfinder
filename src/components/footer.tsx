import * as React from "react";
import Grid from "@mui/material/Grid";

export function Footer() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "5rem" }}
    >
      Made with &#x2665;
    </Grid>
  );
}

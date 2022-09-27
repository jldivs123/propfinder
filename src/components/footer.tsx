import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export function Footer() {
  return (
    <Container sx={{ height: "24rem" }}>
      <Stack alignItems="center" justifyContent="center">
        <Typography color="text.secondary">Made with &#x2665;</Typography>
      </Stack>
    </Container>
  );
}

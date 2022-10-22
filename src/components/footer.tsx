import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function Footer() {
  return (
    <Box
      sx={{
        maxHeight: "50px",
        height: "50px",
        flexShrink: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Typography color="text.secondary">Made with &#x2665;</Typography>
      </Stack>
    </Box>
  );
}

import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-spring-bottom-sheet/dist/style.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// * Components
import { MapPage, PropertyDetailPage, HomePage, BookMarkPage } from "./pages";
import { ResponsiveAppBar, Footer } from "./components";

import { ScreenSizeContextProvider } from "./utils";
import "./App.css";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
      light: "#0B0F58",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "#f2f2f2",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "sans-serif",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <ScreenSizeContextProvider>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <CssBaseline />
          <Grid
            container
            direction="column"
            sx={{
              flexGrow: 2,
              width: "100%",
              height: "auto",
              margin: 0,
              padding: 0,
            }}
          >
            <Grid item sx={{ flexGrow: 0 }}>
              <ResponsiveAppBar />
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              className="grow"
              sx={{
                flexShrink: 0,
                flexGrow: 1,
                marginTop: "4rem",
              }}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  flexGrow: 1,
                  display: "flex",
                  height: "auto",
                }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />}>
                    Home
                  </Route>
                  <Route path="/map" element={<MapPage />}>
                    Map
                  </Route>
                  <Route path="/bookmark" element={<BookMarkPage />}>
                    Bookmark
                  </Route>
                  <Route
                    path="/properties/:id"
                    element={<PropertyDetailPage />}
                  >
                    Exact Property
                  </Route>
                  {/* <Route path="/">Home</Route> */}
                </Routes>
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 0 }}>
              <Footer />
            </Grid>
          </Grid>
        </BrowserRouter>
      </ThemeProvider>
    </ScreenSizeContextProvider>
  );
}

export default App;

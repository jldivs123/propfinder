import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// * Components
import { MapPage, PropertyDetailPage, HomePage } from "./pages";
import { ResponsiveAppBar, Footer } from "./components";

import { ScreenSizeContextProvider } from "./utils";
import "./App.css";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  margin-top: 64px;
  flex-grow: 3;
`;

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

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
          <AppContainer className="flex max-h-screen flex-col">
            <ResponsiveAppBar />
            <Wrapper className="grow">
              <Routes>
                <Route path="/" element={<HomePage />}>
                  Home
                </Route>
                <Route path="/map" element={<MapPage />}>
                  Map
                </Route>
                <Route path="/properties/:id" element={<PropertyDetailPage />}>
                  Exact Property
                </Route>
                {/* <Route path="/">Home</Route> */}
              </Routes>
            </Wrapper>
            <Footer />
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </ScreenSizeContextProvider>
  );
}

export default App;

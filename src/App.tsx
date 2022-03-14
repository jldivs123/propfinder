import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// * Components
import { MapPage } from "./pages/property-map";
import { ResponsiveAppBar } from "./components";

import { ScreenSizeContextProvider } from "./utils";
import "./App.css";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0B0F58",
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
          <AppContainer>
            <ResponsiveAppBar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<MapPage />}>
                  Map
                </Route>
                <Route path="/properties/id">Exact Property</Route>
                {/* <Route path="/">Home</Route> */}
              </Routes>
            </Wrapper>
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </ScreenSizeContextProvider>
  );
}

export default App;

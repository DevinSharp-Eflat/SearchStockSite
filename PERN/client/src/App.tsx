import React, { useMemo } from "react";

import "./App.css";
import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Button, PaletteMode } from "@mui/material";
import Head from "./components/Head";

export default function App() {
  const [theme, setTheme] = useState("dark" as PaletteMode);
  const themeData = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  return (
    <>
      <ThemeProvider theme={themeData}>
        <CssBaseline />
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === `dark` ? `Light` : `Dark`} Mode
        </Button>
        <Head />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

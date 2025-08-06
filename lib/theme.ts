"use client";
import { createTheme } from "@mui/material/styles";
import { blueGrey, green, red, teal } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: green[800],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./material-theme";
// import useBaseUrl from "@docusaurus/useBaseUrl";

// Default implementation, that you can customize
function Root({ children }) {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}

export default Root;

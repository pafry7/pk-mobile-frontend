import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./src/common/theme";
import { AuthProvider } from "./src/context/auth-context";
import { Router } from "./src/navigation";

export default function App() {
  console.log("I am in app");
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}

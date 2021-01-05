import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./src/common/theme";
import { AuthProvider } from "./src/context/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Router } from "./src/navigation";
import { ErrorHandler } from "./src/components/ErrorHandler";

export default function App() {
  console.log("I am in app");
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <ErrorHandler>
            <Router />
          </ErrorHandler>
        </SafeAreaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

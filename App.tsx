import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import theme from "./src/common/theme";
import { AuthProvider } from "./src/context/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Router } from "./src/navigation";
import { ErrorHandler } from "./src/components/ErrorHandler";
import { SnackbarProvider } from "./src/context/snackbar-context";
import { LogBox } from "react-native";

// LogBox.ignoreLogs(["Animated: `useNativeDriver` was not sepcified"]);
LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

export default function App() {
  console.log("I am in app");
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <SnackbarProvider>
            <StatusBar style="dark" />
            <ErrorHandler>
              <Router />
            </ErrorHandler>
          </SnackbarProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

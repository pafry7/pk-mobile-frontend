import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./common/theme";
import { HomeTabs } from "./navigation/HomeTabs";
import { AuthStack } from "./navigation/AuthStack";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* {loggedIn ? <HomeTabs /> : <AuthStack />} */}
        <HomeTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

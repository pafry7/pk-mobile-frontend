import React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { NavigationContainer } from "@react-navigation/native";
import theme from "./src/common/theme";
import { HomeTabs } from "./src/navigation/HomeTabs";
import { AuthStack } from "./src/navigation/AuthStack";

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

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "../screens/Home";

const Stack = createStackNavigator();

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export { AuthStack };

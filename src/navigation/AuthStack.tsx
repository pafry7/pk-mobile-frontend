import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../screens/Login";

const Stack = createStackNavigator();

const AuthStack = (): JSX.Element => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Login} />
    </Stack.Navigator>
  );
};

export { AuthStack };

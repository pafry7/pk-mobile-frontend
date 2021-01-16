import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./MainStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/auth-context";
interface RouterProps {}

const Router: React.FC<RouterProps> = ({}) => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export { Router };

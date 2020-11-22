import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs } from "./HomeTabs";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../context/auth-context";
import * as auth from "../auth-provider";
import { ApolloProvider } from "@apollo/react-hooks";
import makeApolloClient from "../apollo";
import Text from "../components/Text";
import Box from "../components/Box";

interface RouterProps {}

const Router: React.FC<RouterProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [client, setClient] = React.useState(null);
  const { user } = useAuth();

  async function bootstrapApollo() {
    const token = await auth.getToken();
    console.log("token", token);
    if (token) {
      console.log("here in token");
      const client = makeApolloClient(token);
      setClient(client);
    }
    setIsLoading(false);
  }

  React.useEffect(() => {
    bootstrapApollo();
  }, [user]);

  if (isLoading) {
    return (
      <Box
        backgroundColor="success"
        alignItems="center"
        justifyContent="center"
      >
        <Text>loading...</Text>
      </Box>
    );
  }

  console.log("client === null:", client === null);
  return (
    <NavigationContainer>
      {user ? (
        <ApolloProvider client={client}>
          <HomeTabs />
        </ApolloProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export { Router };

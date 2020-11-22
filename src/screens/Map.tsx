import React from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import * as SecureStore from "expo-secure-store";
import { Button } from "../components/Button";
import { useAuth } from "../context/auth-context";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

interface HomeProps {}
const FETCH_USERS = gql`
  query MyQuery {
    test_users {
      full_name
    }
  }
`;

const Map: React.FC<HomeProps> = ({}) => {
  const { logout, user } = useAuth();
  const { data, error, loading } = useQuery(FETCH_USERS);
  console.log("iam in map");
  // const { data, error, loading } = { error: "x", data: "x", loading: false };

  const printJwt = async () => {
    const t = await SecureStore.getItemAsync("jwtToken");
    console.log(t);
  };

  if (error) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text mb="m" color="primaryText">
          Map
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      {loading ? (
        <Text>loading... in map</Text>
      ) : (
        <>
          <Text mb="m" color="primaryText">
            Map
          </Text>
          <Text mb="xl" color="primaryText">
            Hello {user.full_name}
          </Text>
          <Text mb="xl" color="primaryText">
            Hello {data.test_users[0].full_name}
          </Text>
          <Button mb="xl" label="logout" onPress={logout}></Button>
          <Button label="print jwt" onPress={printJwt}></Button>
        </>
      )}
    </Box>
  );
};

export { Map };

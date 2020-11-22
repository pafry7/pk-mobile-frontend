import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getToken } from "./auth-provider";
import { from } from "apollo-link";
import { setContext } from "apollo-link-context";

const makeApolloClient = () => {
  const httpLink = new HttpLink({
    uri: `https://premium-grouse-91.hasura.app/v1/graphql`,
  });

  const authMiddleware = setContext(async (req, { headers }) => {
    const token = await getToken();

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
        "X-Hasura-Admin-Secret": "LjcKE3fezpUypfw",
      },
    };
  });

  const client = new ApolloClient({
    link: from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });
  // create an apollo link instance, a network interface for apollo client
  return client;
};
export { makeApolloClient };

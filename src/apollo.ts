import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

const makeApolloClient = (token: string) => {
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: `https://premium-grouse-91.hasura.app/v1/graphql`,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Hasura-Admin-Secret": "LjcKE3fezpUypfw",
    },
  });
  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();
  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};
export default makeApolloClient;

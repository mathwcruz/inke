import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_API_ACCESS_URI,
  headers: {
    Authrotization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

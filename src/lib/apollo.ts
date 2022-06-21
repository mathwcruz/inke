import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-us-west-2.graphcms.com/v2/cl4o7sk6z126601xieljue8gj/master",
  cache: new InMemoryCache(),
});

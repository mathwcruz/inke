import { ApolloProvider } from "@apollo/client";

import { Router } from "./Router";

import { apolloClient } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;

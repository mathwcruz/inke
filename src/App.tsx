import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Router } from "./Router";

import { apolloClient } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;

import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { apolloClient } from "./lib/apollo";

import { MenuContextProvider } from "./contexts/MenuContext";
import { Router } from "./Router";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <MenuContextProvider>
          <Router />
        </MenuContextProvider>
        <ToastContainer />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;

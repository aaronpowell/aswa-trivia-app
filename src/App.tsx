import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateGame from "./CreateGame";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import JoinGame from "./JoinGame";
import PlayGame from "./PlayGame";

const GRAPHQL_ENDPOINT = `${
  process.env.NODE_ENV === "production" ? "" : "http://localhost:7071"
}/api/graphql`;

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Route path="/" exact component={CreateGame} />
          <Route path="/game/join/:id" component={JoinGame} />
          <Route path="/game/play/:id/:playerId" component={PlayGame} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

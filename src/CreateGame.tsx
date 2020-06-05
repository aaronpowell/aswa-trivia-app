import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks"

const CREATE_GAME = gql`
mutation {
  createGame {
    id
  }
}`

const CreateGame: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [createGame, { loading, called, data, error }] = useMutation(CREATE_GAME);

  useEffect(() => {
    if (creating) {
        createGame()
    }
  }, [creating, createGame])

  useEffect(() => {
      if (!loading && called && !error) {
          console.log(data);
      } else if (error) {
          console.error(error);
      }
  }, [loading, called, data, error])

  return (
    <div>
      <h1>Create a new game!</h1>
      <button disabled={creating} onClick={() => setCreating(true)}>Start a new game</button>
    </div>
  );
};

export default CreateGame;

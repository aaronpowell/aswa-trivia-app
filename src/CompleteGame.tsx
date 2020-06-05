import React from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { PlayerResult } from "../api/graphql/types";

const PLAYER_RESULTS = gql`
  query playerResults($gameId: ID!, $playerId: ID!) {
    playerResults(gameId: $gameId, playerId: $playerId) {
      correct
      question
      answers
      correctAnswer
      submittedAnswer
    }
  }
`;

const CompleteGame: React.FC = () => {
  const { id, playerId } = useParams();
  const { loading, data } = useQuery(PLAYER_RESULTS, {
    variables: { gameId: id, playerId },
  });

  if (loading && !data) {
    return <h1>Waiting for your answers</h1>;
  }

  return (
    <div>
      <h1>Game over man, game over!</h1>
      {data.playerResults.map((result: PlayerResult) => {
        return (
          <div>
            <h2>
              {result.question} {result.correct ? "✅" : "❌"}
            </h2>
            <ul>
              {result.answers.map((a) => {
                return (
                  <li key={a}>
                    {a} {a === result.submittedAnswer ? "(Your Answer)" : ""}{" "}
                    {a === result.correctAnswer ? "(Correct Answer)" : ""}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CompleteGame;

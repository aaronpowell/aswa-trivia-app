import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useInterval from "./useInterval";

const GET_GAME = gql`
  query getGame($id: ID!) {
    game(id: $id) {
      questions {
        id
        question
        answers
      }
    }
  }
`;

const SUBMIT_ANSWER = gql`
  mutation submitAnswer(
    $gameId: ID!
    $playerId: ID!
    $questionId: ID!
    $answer: String!
  ) {
    submitAnswer(
      gameId: $gameId
      playerId: $playerId
      questionId: $questionId
      answer: $answer
    ) {
      id
    }
  }
`;

const PlayGame: React.FC = () => {
  const { id, playerId } = useParams();
  const history = useHistory();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [answer, setAnswer] = useState("");
  const { loading, data } = useQuery(GET_GAME, { variables: { id } });
  const [question, setQuestion] = useState<{
    question: string;
    answers: string[];
    id: string;
  }>();
  const [submitAnswer] = useMutation(SUBMIT_ANSWER);

  useInterval(() => {
    if (question) {
      if (timeRemaining === 0) {
        const q = data.game.questions.pop();

        if (!q) {
          history.push(`/game/finish/${id}/${playerId}`);
          return;
        } else {
          setTimeRemaining(30);
          setQuestion(q);
          setAnswer("");
        }
      } else {
        setTimeRemaining(timeRemaining - 1);
      }
    }
  }, 1000);

  useEffect(() => {
    if (data) {
      const q = data.game.questions.pop();
      setTimeRemaining(30);
      setQuestion(q);
    }
  }, [data]);

  useEffect(() => {
    if (timeRemaining === 0 && question) {
      submitAnswer({
        variables: {
          gameId: id,
          playerId,
          questionId: question.id,
          answer,
        },
      });
    }
  }, [submitAnswer, id, playerId, question, answer, timeRemaining]);

  if (loading || !question) {
    return <h1>Just getting the game ready, please wait</h1>;
  }

  return (
    <div>
      <h1>Play game {id}!</h1>
      <h2>Time remaining: {timeRemaining}</h2>
      <h2>{question.question}</h2>
      <ul>
        {question.answers.map((a) => {
          return (
            <li key={a}>
              <label>
                <input
                  type="radio"
                  value={a}
                  onChange={() => setAnswer(a)}
                  name="answer"
                />
                {a}
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={() => setTimeRemaining(0)}>Submit Answer</button>
    </div>
  );
};

export default PlayGame;

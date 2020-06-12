import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: "Answer";
  answer: Scalars["String"];
  question: Question;
};

export type Game = {
  __typename?: "Game";
  id: Scalars["ID"];
  state?: Maybe<GameState>;
  players: Array<Player>;
  questions: Array<Question>;
};

export enum GameState {
  WaitingForPlayers = "WaitingForPlayers",
  Started = "Started",
  Completed = "Completed",
}

export type Mutation = {
  __typename?: "Mutation";
  createGame?: Maybe<Game>;
  addPlayerToGame: Player;
  startGame?: Maybe<Game>;
  submitAnswer?: Maybe<Player>;
};

export type MutationAddPlayerToGameArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationStartGameArgs = {
  id: Scalars["ID"];
};

export type MutationSubmitAnswerArgs = {
  gameId: Scalars["ID"];
  playerId: Scalars["ID"];
  questionId: Scalars["ID"];
  answer: Scalars["String"];
};

export type Player = {
  __typename?: "Player";
  id: Scalars["ID"];
  name: Scalars["String"];
  answers: Array<Answer>;
};

export type PlayerResult = {
  __typename?: "PlayerResult";
  name: Scalars["String"];
  question: Scalars["String"];
  submittedAnswer: Scalars["String"];
  correctAnswer: Scalars["String"];
  answers: Array<Scalars["String"]>;
  correct?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  game?: Maybe<Game>;
  games: Array<Game>;
  playerResults: Array<PlayerResult>;
};

export type QueryGameArgs = {
  id: Scalars["ID"];
};

export type QueryPlayerResultsArgs = {
  gameId: Scalars["ID"];
  playerId: Scalars["ID"];
};

export type Question = {
  __typename?: "Question";
  id: Scalars["ID"];
  question: Scalars["String"];
  correctAnswer: Scalars["String"];
  answers: Array<Scalars["String"]>;
};

export type PlayerResultsQueryVariables = Exact<{
  gameId: Scalars["ID"];
  playerId: Scalars["ID"];
}>;

export type PlayerResultsQuery = { __typename?: "Query" } & {
  playerResults: Array<
    { __typename?: "PlayerResult" } & Pick<
      PlayerResult,
      "correct" | "question" | "answers" | "correctAnswer" | "submittedAnswer"
    >
  >;
};

export type CreateGameMutationVariables = Exact<{ [key: string]: never }>;

export type CreateGameMutation = { __typename?: "Mutation" } & {
  createGame?: Maybe<{ __typename?: "Game" } & Pick<Game, "id">>;
};

export const PlayerResultsDocument = gql`
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

/**
 * __usePlayerResultsQuery__
 *
 * To run a query within a React component, call `usePlayerResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlayerResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerResultsQuery({
 *   variables: {
 *      gameId: // value for 'gameId'
 *      playerId: // value for 'playerId'
 *   },
 * });
 */
export function usePlayerResultsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PlayerResultsQuery,
    PlayerResultsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    PlayerResultsQuery,
    PlayerResultsQueryVariables
  >(PlayerResultsDocument, baseOptions);
}
export function usePlayerResultsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PlayerResultsQuery,
    PlayerResultsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    PlayerResultsQuery,
    PlayerResultsQueryVariables
  >(PlayerResultsDocument, baseOptions);
}
export type PlayerResultsQueryHookResult = ReturnType<
  typeof usePlayerResultsQuery
>;
export type PlayerResultsLazyQueryHookResult = ReturnType<
  typeof usePlayerResultsLazyQuery
>;
export type PlayerResultsQueryResult = ApolloReactCommon.QueryResult<
  PlayerResultsQuery,
  PlayerResultsQueryVariables
>;
export const CreateGameDocument = gql`
  mutation CreateGame {
    createGame {
      id
    }
  }
`;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<
  CreateGameMutation,
  CreateGameMutationVariables
>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGameMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateGameMutation,
    CreateGameMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CreateGameDocument, baseOptions);
}
export type CreateGameMutationHookResult = ReturnType<
  typeof useCreateGameMutation
>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<
  CreateGameMutation
>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGameMutation,
  CreateGameMutationVariables
>;

import { IResolvers, ValidationError } from "apollo-server-azure-functions";
import { Game, GameState, Player, PlayerResult } from "./types";
import axios from "axios";

const games: Game[] = [];
const TRIVIA_API =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple";

const idGenerator = () => {
  const chars = "qwertyuioplkjhgfdsazxcvbnm";

  let code = "";

  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * chars.length);
    code += chars[random];
  }

  return code;
};

const resolvers: IResolvers = {
  Query: {
    game(_, { id }): Game {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new ValidationError("No game found!");
      }

      return game;
    },
    games(): Game[] {
      return games;
    },

    playerResults(_, { gameId, playerId }): PlayerResult[] {
      const game = games.find((g) => g.id === gameId);

      if (!game) {
        throw new ValidationError("No game found!");
      }

      const player = game.players.find((p) => p.id === playerId);

      return player.answers.map((answer) => {
        return {
          submittedAnswer: answer.answer,
          correctAnswer: answer.question.correctAnswer,
          question: answer.question.question,
          name: player.name,
          answers: answer.question.answers,
          correct: answer.question.correctAnswer === answer.answer,
        };
      });
    },
  },

  Mutation: {
    async createGame(): Promise<Game> {
      const questions = await axios.get(TRIVIA_API);

      const id = idGenerator();

      const game = {
        id: id,
        state: GameState.WaitingForPlayers,
        players: [],
        questions: questions.data.results.map((q) => {
          return {
            id: q.question,
            question: q.question,
            correctAnswer: q.correct_answer,
            answers: q.incorrect_answers.concat(q.correct_answer).sort(),
          };
        }),
      };
      games.push(game);

      return game;
    },

    addPlayerToGame(_, { id, name }): Player {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new ValidationError("No game found!");
      }

      if (game.state !== GameState.WaitingForPlayers) {
        throw new ValidationError("Game is already started, no cheating");
      }

      const playerId = idGenerator();

      const player = {
        id: playerId,
        name,
        answers: [],
      };

      game.players.push(player);

      return player;
    },

    startGame(_, { id }): Game {
      const game = games.find((g) => g.id === id);

      if (!game) {
        throw new ValidationError("No game found!");
      }

      if (game.state !== GameState.WaitingForPlayers) {
        throw new ValidationError("Game is already underway or complete");
      }

      game.state = GameState.Started;

      return game;
    },

    submitAnswer(_, { gameId, playerId, questionId, answer }) {
      const game = games.find((g) => g.id === gameId);

      if (!game) {
        throw new ValidationError("No game found!");
      }

      const player = game.players.find((p) => p.id === playerId);

      if (!player) {
        throw new ValidationError("No player");
      }

      const question = game.questions.find((q) => q.id === questionId);

      player.answers.push({
        answer,
        question,
      });

      return player;
    },
  },
};

export default resolvers;

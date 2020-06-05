import { IResolvers, ValidationError } from "apollo-server-azure-functions";
import { Game, GameState } from "./types";
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
            answers: q.incorrect_answers.concat(q.correct_answer),
          };
        }),
      };
      games.push(game);

      return game;
    },
  },
};

export default resolvers;

export enum GameState {
  WaitingForPlayers = "WaitingForPlayers",
  Started = "Started",
  Complete = "Complete",
}

export type Question = {
  id: string;
  question: string;
  correctAnswer: string;
  answer: string[];
};

export type Answer = {
  answer: string;
  question: Question;
};

export type Player = {
  id: string;
  name: string;
  answers: Answer[];
};

export type Game = {
  id: string;
  state: GameState;
  players: Player[];
  questions: Question[];
};

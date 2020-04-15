interface Player {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Game {
  id?: number;
  boardState?: number[][];
  player1Score?: number;
  player2Score?: number;
  createdAt?: string;
  updatedAt?: string;
  gameStatus?: string;
  player1?: Player;
  player2?: Player;
  winner?: Player;
}

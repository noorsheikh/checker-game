interface Player {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface GameMove {
  id: number;
  gameId: number;
  player: Player;
  boardState: number[][];
  timestamp: string;
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
  player2Id?: number;
  winnderId?: number;
  playerTurn?: number;
  gameLocked?: number;
  gameMoves?: GameMove[];
}

export interface LeaderboardPlayer {
    id: number;
    username: string;
    wins: number;
    losses: number;
    numGames: number;
    winRatio: number;
}
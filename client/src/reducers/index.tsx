import { combineReducers } from 'redux';
import { registerUserReducer, getLeaderboardReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getGameReducer, getCurrentGamesReducer, addGameMoveReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer || getGameReducer || addGameMoveReducer,
  currentGames: getCurrentGamesReducer,
  leaderboard: getLeaderboardReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { registerUserReducer, getLeaderboardReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getCurrentGamesReducer, getFinishedGamesReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer,
  currentGames: getCurrentGamesReducer,
  finishedGames: getFinishedGamesReducer,
  leaderboard: getLeaderboardReducer
});

export default rootReducer;

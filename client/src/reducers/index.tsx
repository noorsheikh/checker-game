import { combineReducers } from 'redux';
import { registerUserReducer, getLeaderboardReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getGameReducer, getCurrentGamesReducer, getUnstartedGamesReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer || getGameReducer,
  unstartedGames: getUnstartedGamesReducer,
  currentGames: getCurrentGamesReducer,
  leaderboard: getLeaderboardReducer
});

export default rootReducer;

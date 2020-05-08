import { combineReducers } from 'redux';
import { registerUserReducer, getLeaderboardReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getGameReducer, getUnstartedGamesReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer || getGameReducer,
  unstartedGames: getUnstartedGamesReducer,
  leaderboard: getLeaderboardReducer
});

export default rootReducer;

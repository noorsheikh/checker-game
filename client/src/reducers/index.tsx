import { combineReducers } from 'redux';
import { registerUserReducer, getLeaderboardReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer,
  leaderboard: getLeaderboardReducer
});

export default rootReducer;

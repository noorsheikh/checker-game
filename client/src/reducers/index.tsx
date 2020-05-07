import { combineReducers } from 'redux';
import { registerUserReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getGameReducer, getUnstartedGamesReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer || getGameReducer,
  unstartedGames: getUnstartedGamesReducer
});

export default rootReducer;

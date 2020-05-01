import { combineReducers } from 'redux';
import { registerUserReducer } from './user';
import { userLoginReducer } from './auth';
import { createGameReducer, updateGameReducer, getGameReducer } from './game';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
  game: createGameReducer || updateGameReducer || getGameReducer,
});

export default rootReducer;

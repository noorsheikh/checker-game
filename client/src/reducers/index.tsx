import { combineReducers } from 'redux';
import { registerUserReducer } from './user';
import { userLoginReducer } from './auth';

const rootReducer = combineReducers({
  register: registerUserReducer,
  currentUser: userLoginReducer,
});

export default rootReducer;

import { User } from '../../models/User';
import { RegisterUserActionTypes } from '../../actions/user';
import { AnyAction } from 'redux';

export interface RegisterUserState {
  type: string;
  user: User;
  error: string[];
}

export const registerUserReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case RegisterUserActionTypes.REGISTER_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case RegisterUserActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
    case RegisterUserActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        pending: false,
        user: null,
        error: action.error,
      };
    default:
      return state;
  }
};

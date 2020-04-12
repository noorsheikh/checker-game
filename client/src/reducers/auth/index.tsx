import { CurrentUser } from '../../models/CurrentUser';
import { LoginActions } from '../../actions/auth';
import { AnyAction } from 'redux';

export interface CurrentUserState {
  pending: boolean;
  currentUser: CurrentUser;
  error: string;
}

export const userLoginReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case LoginActions.LOGIN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case LoginActions.LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        currentUser: action.payload,
        error: '',
      };
    case LoginActions.LOGIN_ERROR:
      return {
        ...state,
        pending: true,
        currentUser: null,
        error: action.error,
      };
    default:
      return state;
  }
};

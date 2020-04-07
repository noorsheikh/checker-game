import { CurrentUser } from "../../models/CurrentUser";
import { LoginActions } from '../../actions/auth';

interface UserLoginAction {
  type: string;
  payload: CurrentUser;
  error: string;
}

export interface CurrentUserState {
  pending: boolean;
  currentUser: CurrentUser;
  error: string;
}

const initialState: CurrentUserState = {
  pending: true,
  currentUser: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    userType: '',
    token: '',
    isLoggedIn: false,
  },
  error: ''
};

export const userLoginReducer = (state = initialState, action: UserLoginAction) => {
  switch(action.type) {
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
      };
    case LoginActions.LOGIN_ERROR:
      return {
        ...state,
        pending: true,
        error: action.error,
      };
    default:
      return state;
  }
}
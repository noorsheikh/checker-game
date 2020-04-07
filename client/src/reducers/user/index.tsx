import { User } from "../../models/User";
import { RegisterUserActionTypes } from "../../actions/user";

interface RegisterUserAction {
  type: string;
  payload: User;
  error: string;
}

export const registerUserReducer = (state = {}, action: RegisterUserAction) => {
  switch(action.type) {
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
      };
    case RegisterUserActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
}

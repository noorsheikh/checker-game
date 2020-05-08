import { User } from '../../models/User';
import { LeaderboardPlayer } from '../../models/Leaderboard';
import { RegisterUserActionTypes, UserActionTypes } from '../../actions/user';
import { AnyAction } from 'redux';

export interface RegisterUserState {
  type: string;
  user: string;
  error: string[];
}

export interface LeaderboardState {
  pending: boolean;
  leaderboard: LeaderboardPlayer[];
  error: string;
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

export const getLeaderboardReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.PENDING:
      return {
        ...state,
        pending: true,
      };
    case UserActionTypes.SUCCESS:
      return {
        ...state,
        pending: false,
        leaderboard: action.payload,
        error: null,
      };
    case UserActionTypes.ERROR:
      return {
        ...state,
        pending: false,
        leaderboard: null,
        error: action.error,
      };
    default:
      return state;
  }
};

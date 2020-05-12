import axios from 'axios';
import { User } from '../../models/User';
import { Dispatch } from 'redux';
import { host } from '../../utils';

export enum RegisterUserActionTypes {
  REGISTER_USER_PENDING = 'REGISTER_USER_PENDING',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
}

export enum UserActionTypes {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const registerUser = (userPayload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: RegisterUserActionTypes.REGISTER_USER_PENDING });
  try {
    const url ='https://' + host + ':443/api/user/register';
    const user = await axios.post(url, userPayload);
    dispatch({
      type: RegisterUserActionTypes.REGISTER_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: RegisterUserActionTypes.REGISTER_USER_ERROR,
      error: error?.response?.data?.message || ['New user registration failed'],
    });
  }
};

export const getLeaderboard = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: UserActionTypes.PENDING });
  try {
    const url = 'https://' + host + ':443/api/secure/leaderboard';
    const leaderboard = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: UserActionTypes.SUCCESS,
      payload: leaderboard?.data,
    });
  } catch (error) {
    dispatch({
      type: UserActionTypes.ERROR,
      error: error?.response?.data?.message || 'Cannot Get Leaderboard',
    });
  }
};

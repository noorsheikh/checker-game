import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { Dispatch } from 'redux';
import { CurrentUser } from '../../models/CurrentUser';
import { host } from '../../utils';

export enum LoginActions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCEES',
  LOGIN_ERROR = 'LOGIN_ERROR',
}

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
  dispatch({ type: LoginActions.LOGIN_PENDING });

  try {
    const url = 'https://' + host + ':443/api/login';
    const token = await axios.post(url, { username, password });
    const decodedToken: any = jwt.decode(token.data);
    const currentUser: CurrentUser = {
      token: token.data,
      isLoggedIn: token && token.data ? true : false,
      ...decodedToken,
    };
    dispatch({
      type: LoginActions.LOGIN_SUCCESS,
      payload: currentUser,
    });
  } catch (error) {
    dispatch({
      type: LoginActions.LOGIN_ERROR,
      error: error?.response?.data?.message || 'Authentication Denied',
    });
  }
};

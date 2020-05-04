import axios from 'axios';
import { User } from '../../models/User';
import { Dispatch } from 'redux';
import { authHttpFlag, host, authHttpPort, authHttpsPort } from '../../utils';

export enum RegisterUserActionTypes {
  REGISTER_USER_PENDING = 'REGISTER_USER_PENDING',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
}

export const registerUser = (userPayload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: RegisterUserActionTypes.REGISTER_USER_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + '/api/user/register';
    const user = await axios.post(url, userPayload);
    dispatch({
      type: RegisterUserActionTypes.REGISTER_USER_SUCCESS,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: RegisterUserActionTypes.REGISTER_USER_ERROR,
      error: error?.response?.data?.message,
    });
  }
};

import axios from 'axios';
import { Dispatch } from 'redux';
import { Game } from '../../models';
import { authHttpFlag, host, authHttpPort, authHttpsPort } from '../../utils';

export enum GameActionTypes {
  GAME_PENDING = 'GAME_PENDING',
  GAME_SUCCESS = 'GAME_SUCCESS',
  GAME_ERROR = 'GAME_ERROR',
}

export const createGame = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + '/api/secure/game-board/create';
    const game = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: GameActionTypes.GAME_SUCCESS,
      payload: game?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message,
    });
  }
};

export const updateGame = (token: string, gameId: number, gamePayload: Game) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/game-board/update/${gameId}`;
    const game = await axios.post(
      url,
      gamePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: GameActionTypes.GAME_SUCCESS,
      payload: game?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message,
    });
  }
};

export const getCurrentGames = (token: string, userId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/current-games/${userId}`;
    const currentGames = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: GameActionTypes.GAME_SUCCESS,
      payload: currentGames?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message,
    });
  }
};

export const getFinishedGames = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/finished-games`;
    const finishedGames = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: GameActionTypes.GAME_SUCCESS,
      payload: finishedGames?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message,
    });
  }
};

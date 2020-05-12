import axios from 'axios';
import { Dispatch } from 'redux';
import { Game, GameMove } from '../../models';
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
      error: error?.response?.data?.message || ['Cannot create game board'],
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
      error: error?.response?.data?.message || ['Cannot update game'],
    });
  }
};

export const getGame = (token: string, gameId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/game-board/${gameId}`;
    const game = await axios.get(
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
      payload: game?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message || ['Cannot get game'],
    });
  }
}

export const getCurrentGames = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/current-games`;
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
      error: error?.response?.data?.message || ['Cannot get user games'],
    });
  }
};

export const addGameMove = (token: string, gameMovePayload: GameMove) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/game-move/add`;
    const gameMove = await axios.post(
      url,
      gameMovePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    dispatch({
      type: GameActionTypes.GAME_SUCCESS,
      payload: gameMove?.data,
    });
  } catch (error) {
    dispatch({
      type: GameActionTypes.GAME_ERROR,
      error: error?.response?.data?.message || ['Cannot add game move'],
    });
  }
};

export const updateGamesStatus = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const http = authHttpFlag === '1' ? 'http' : 'https';
    const port = authHttpFlag === '1' ? authHttpPort : authHttpsPort;
    const url = http + '://' + host + ':' + port + `/api/secure/update-games-status`;
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
      error: error?.response?.data?.message || ['Cannot update games status'],
    });
  }
};

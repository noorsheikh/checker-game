import axios from 'axios';
import { Dispatch } from 'redux';
import { Game } from '../../models';

export enum GameActionTypes {
  GAME_PENDING = 'GAME_PENDING',
  GAME_SUCCESS = 'GAME_SUCCESS',
  GAME_ERROR = 'GAME_ERROR',
}

export const createGame = (token: string) => async (dispatch: Dispatch) => {
  dispatch({ type: GameActionTypes.GAME_PENDING });
  try {
    const game = await axios.post(
      `http://localhost:80/api/secure/game-board/create`,
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
    const game = await axios.post(
      `http://localhost:80/api/secure/game-board/update/${gameId}`,
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

import { Game } from '../../models';
import { GameActionTypes } from '../../actions/game';
import { AnyAction } from 'redux';

export interface GameState {
  pending: boolean;
  game: Game;
  error: string[];
}

export interface GamesState {
  pending: boolean;
  games: Game[];
  error: string[];
}

export const createGameReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case GameActionTypes.GAME_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GameActionTypes.GAME_SUCCESS:
      return {
        ...state,
        pending: false,
        game: action.payload,
        error: null,
      };
    case GameActionTypes.GAME_ERROR:
      return {
        ...state,
        pending: false,
        game: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export const updateGameReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case GameActionTypes.GAME_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GameActionTypes.GAME_SUCCESS:
      return {
        ...state,
        pending: false,
        game: action.payload,
        error: null,
      };
    case GameActionTypes.GAME_ERROR:
      return {
        ...state,
        pending: false,
        game: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getGameReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case GameActionTypes.GAME_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GameActionTypes.GAME_SUCCESS:
      return {
        ...state,
        pending: false,
        game: action.payload,
        error: null,
      };
    case GameActionTypes.GAME_ERROR:
      return {
        ...state,
        pending: false,
        game: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getCurrentGamesReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case GameActionTypes.GAME_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GameActionTypes.GAME_SUCCESS:
      return {
        ...state,
        pending: false,
        games: action.payload,
        error: null,
      };
    case GameActionTypes.GAME_ERROR:
      return {
        ...state,
        pending: false,
        games: null,
        error: action.error,
      };
    default:
      return state;
  }
};

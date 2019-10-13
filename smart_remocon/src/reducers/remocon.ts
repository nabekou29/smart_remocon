import { Remocon, Signal } from '../interfaces/entities';
import {
  RemoconAction,
  RemoconActionTypes as actionTypes,
} from '../actions/remocon';

import { AxiosError } from 'axios';

/** State */
export interface RemoconState {
  remocon?: Remocon;
  signals: Signal[];
  receivedCode?: number[];
  isLoading: boolean;
  isWaitingSignal: boolean;
  error?: AxiosError;
}

/** 初期値 */
export const initialState: RemoconState = {
  signals: [],
  isLoading: false,
  isWaitingSignal: false,
};

/** Reducer */
export const remoconReducer = (
  state = initialState,
  action: RemoconAction
): RemoconState => {
  switch (action.type) {
    case actionTypes.INITIALIZE_START: {
      return {
        ...initialState,
        isLoading: true,
      };
    }
    case actionTypes.RECEIVE_SIGNAL_START: {
      return {
        ...state,
        isWaitingSignal: true,
      };
    }
    case actionTypes.INITIALIZE_SUCCEED: {
      return {
        ...state,
        remocon: action.payload.result.remocon,
        signals: [...action.payload.result.signals],
        isLoading: false,
      };
    }
    case actionTypes.SEND_SIGNAL_SUCCEED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case actionTypes.RECEIVE_SIGNAL_SUCCEED: {
      return {
        ...state,
        receivedCode: [...action.payload.result.code],
        isWaitingSignal: false,
      };
    }
    // 標準のstart
    case actionTypes.SEND_SIGNAL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // 標準のfail
    case actionTypes.INITIALIZE_FAIL:
    case actionTypes.SEND_SIGNAL_FAIL:
    case actionTypes.RECEIVE_SIGNAL_FAIL: {
      return {
        ...state,
        isLoading: false,
        isWaitingSignal: false,
        error: action.payload.error,
      };
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      return state;
    }
  }
};

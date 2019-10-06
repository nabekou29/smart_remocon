import { Remocon, Signal } from '../interfaces/entities';
import {
  RemoconAction,
  RemoconActionTypes as actionTypes,
} from '../actions/remocon';

import { AxiosError } from 'axios';

/** State */
export interface RemoconState {
  remocon: Remocon | null;
  signals: Signal[];
  isLoading: boolean;
  isWaitingSignal: boolean;
  error: AxiosError | null;
}

/** 初期値 */
export const initialState: RemoconState = {
  remocon: null,
  signals: [],
  isLoading: false,
  isWaitingSignal: false,
  error: null,
};

/** Reducer */
export const remoconReducer = (
  state = initialState,
  action: RemoconAction
): RemoconState => {
  switch (action.type) {
    // succeed
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
    // default start
    case actionTypes.INITIALIZE_START:
    case actionTypes.SEND_SIGNAL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // default fail
    case actionTypes.SEND_SIGNAL_FAIL:
    case actionTypes.INITIALIZE_FAIL: {
      return {
        ...state,
        isLoading: false,
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

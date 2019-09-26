import { TopAction, TopActionTypes as actionTypes } from '../actions/top';

import { AxiosError } from 'axios';
import { Remocon } from '../interfaces/entities';

/** State */
export interface TopState {
  remocons: Remocon[];
  isLoading: boolean;
  error?: AxiosError;
}

/** 初期値 */
export const initialState: TopState = {
  remocons: [],
  isLoading: false,
};

/** サンプル Reducer */
export const topReducer = (
  state = initialState,
  action: TopAction
): TopState => {
  switch (action.type) {
    // succeed
    case actionTypes.INITIALIZE_SUCCEED: {
      return {
        ...state,
        remocons: [...action.payload.result.remocons],
        isLoading: false,
      };
    }
    // default start
    case actionTypes.INITIALIZE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // default fail
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

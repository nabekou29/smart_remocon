import {
  SampleAction,
  sampleActionTypes as actionTypes,
} from '../actions/sample';

import { AxiosError } from 'axios';
import { Sample } from '../interfaces/entities';

/** State */
export interface SampleState {
  samples: Sample[];
  isLoading: boolean;
  error?: AxiosError;
}

/** 初期値 */
export const initialState: SampleState = {
  samples: [],
  isLoading: false,
};

/** サンプル Reducer */
export function sampleReducer(state = initialState, action: SampleAction) {
  switch (action.type) {
    // succeed
    case actionTypes.INITIALIZE_SUCCEED: {
      return {
        ...state,
        samples: [...action.payload.result.samples],
        isLoading: false,
      };
    }
    case actionTypes.REGISTER_SUCCEED: {
      return {
        ...state,
        samples: [...state.samples, action.payload.result.sample],
        isLoading: false,
      };
    }
    // default start
    case actionTypes.INITIALIZE_START:
    case actionTypes.REGISTER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    // default fail
    case actionTypes.INITIALIZE_FAIL:
    case actionTypes.REGISTER_FAIL: {
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
}

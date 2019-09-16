import { FormStateMap, reducer as reduxFormReducer } from 'redux-form';
import { Reducer, combineReducers } from 'redux';
import { SampleState, sampleReducer } from './sample';

export type AppState = {
  sample: SampleState;
  form: FormStateMap;
};

/** 全てのリデューサを集約したリデューサ */
const reducer: Reducer<AppState> = combineReducers<AppState>({
  sample: sampleReducer,
  form: reduxFormReducer,
});

export default reducer;

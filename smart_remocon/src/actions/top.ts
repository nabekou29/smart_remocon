import { AxiosError } from 'axios';
import { Remocon } from '../interfaces/entities';

/** Actionの種類 */
export enum TopActionTypes {
  INITIALIZE_START = 'TOP/INITIALIZE_START',
  INITIALIZE_SUCCEED = 'TOP/INITIALIZE_SUCCEED',
  INITIALIZE_FAIL = 'TOP/INITIALIZE_FAIL',
}

/** 初期化のResult */
interface InitializeResult {
  remocons: Remocon[];
}

/** 初期化 */
export const initialize = {
  start: () => ({
    type: TopActionTypes.INITIALIZE_START as typeof TopActionTypes.INITIALIZE_START,
  }),
  succeed: (result: InitializeResult) => ({
    type: TopActionTypes.INITIALIZE_SUCCEED as typeof TopActionTypes.INITIALIZE_SUCCEED,
    payload: { result },
  }),
  fail: (error: AxiosError) => ({
    type: TopActionTypes.INITIALIZE_FAIL as typeof TopActionTypes.INITIALIZE_FAIL,
    payload: { error },
  }),
};

/** アクション一覧 */
export type TopAction =
  | ReturnType<typeof initialize.start>
  | ReturnType<typeof initialize.succeed>
  | ReturnType<typeof initialize.fail>;

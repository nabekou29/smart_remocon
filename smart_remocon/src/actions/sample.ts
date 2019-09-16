import { AxiosError } from 'axios';
import { Dayjs } from 'dayjs';
import { Sample } from '../interfaces/entities';

/** Actionの種類 */
export enum sampleActionTypes {
  INITIALIZE_START = 'SAMPLE/INITIALIZE_START',
  INITIALIZE_SUCCEED = 'SAMPLE/INITIALIZE_SUCCEED',
  INITIALIZE_FAIL = 'SAMPLE/INITIALIZE_FAIL',
  REGISTER_START = 'SAMPLE/REGISTER_START',
  REGISTER_SUCCEED = 'SAMPLE/REGISTER_SUCCEED',
  REGISTER_FAIL = 'SAMPLE/REGISTER_FAIL',
}

/** 初期化のResult */
interface InitializeResult {
  samples: Sample[];
}

/** 初期化 */
export const initialize = {
  start: () => ({
    type: sampleActionTypes.INITIALIZE_START as typeof sampleActionTypes.INITIALIZE_START,
  }),
  succeed: (result: InitializeResult) => ({
    type: sampleActionTypes.INITIALIZE_SUCCEED as typeof sampleActionTypes.INITIALIZE_SUCCEED,
    payload: { result },
  }),
  fail: (error: AxiosError) => ({
    type: sampleActionTypes.INITIALIZE_FAIL as typeof sampleActionTypes.INITIALIZE_FAIL,
    payload: { error },
  }),
};

/** 登録のPrams */
interface RegisterParams {
  name: string;
  email?: string;
  birthDate: Dayjs;
  sortOrder: number;
}

/** 登録のResult */
interface RegisterResult {
  sample: Sample;
}

/** 登録 */
export const register = {
  start: (params: RegisterParams) => ({
    type: sampleActionTypes.REGISTER_START as typeof sampleActionTypes.REGISTER_START,
    payload: params,
  }),
  succeed: (params: RegisterParams, result: RegisterResult) => ({
    type: sampleActionTypes.REGISTER_SUCCEED as typeof sampleActionTypes.REGISTER_SUCCEED,
    payload: { params, result },
  }),
  fail: (params: RegisterParams, error: AxiosError) => ({
    type: sampleActionTypes.REGISTER_FAIL as typeof sampleActionTypes.REGISTER_FAIL,
    payload: { params, error },
  }),
};

/** サンプルのアクション */
export type SampleAction =
  | ReturnType<typeof initialize.start>
  | ReturnType<typeof initialize.succeed>
  | ReturnType<typeof initialize.fail>
  | ReturnType<typeof register.start>
  | ReturnType<typeof register.succeed>
  | ReturnType<typeof register.fail>;

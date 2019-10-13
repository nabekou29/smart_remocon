import { Remocon, Signal } from '../interfaces/entities';

import { AxiosError } from 'axios';

/** Actionの種類 */
export enum RemoconActionTypes {
  INITIALIZE_START = 'REMOCON/INITIALIZE_START',
  INITIALIZE_SUCCEED = 'REMOCON/INITIALIZE_SUCCEED',
  INITIALIZE_FAIL = 'REMOCON/INITIALIZE_FAIL',
  SEND_SIGNAL_START = 'REMOCON/SEND_SIGNAL_START',
  SEND_SIGNAL_SUCCEED = 'REMOCON/SEND_SIGNAL_SUCCEED',
  SEND_SIGNAL_FAIL = 'REMOCON/SEND_SIGNAL_FAIL',
  RECEIVE_SIGNAL_START = 'REMOCON/RECEIVE_SIGNAL_START',
  RECEIVE_SIGNAL_SUCCEED = 'REMOCON/RECEIVE_SIGNAL_SUCCEED',
  RECEIVE_SIGNAL_FAIL = 'REMOCON/RECEIVE_SIGNAL_FAIL',
}

/** 初期化のProps */
interface InitializeProps {
  remoconId: string;
}

/** 初期化のResult */
interface InitializeResult {
  remocon: Remocon;
  signals: Signal[];
}

/** 初期化 */
export const initialize = {
  start: (props: InitializeProps) => ({
    type: RemoconActionTypes.INITIALIZE_START as typeof RemoconActionTypes.INITIALIZE_START,
    payload: props,
  }),
  succeed: (result: InitializeResult) => ({
    type: RemoconActionTypes.INITIALIZE_SUCCEED as typeof RemoconActionTypes.INITIALIZE_SUCCEED,
    payload: { result },
  }),
  fail: (error: AxiosError) => ({
    type: RemoconActionTypes.INITIALIZE_FAIL as typeof RemoconActionTypes.INITIALIZE_FAIL,
    payload: { error },
  }),
};

/** 信号送信のParams */
interface SendSignalParams {
  signalId: string;
}

/** 信号送信 */
export const sendSignal = {
  start: (params: SendSignalParams) => ({
    type: RemoconActionTypes.SEND_SIGNAL_START as typeof RemoconActionTypes.SEND_SIGNAL_START,
    payload: params,
  }),
  succeed: (params: SendSignalParams) => ({
    type: RemoconActionTypes.SEND_SIGNAL_SUCCEED as typeof RemoconActionTypes.SEND_SIGNAL_SUCCEED,
    payload: { params },
  }),
  fail: (params: SendSignalParams, error: AxiosError) => ({
    type: RemoconActionTypes.SEND_SIGNAL_FAIL as typeof RemoconActionTypes.SEND_SIGNAL_FAIL,
    payload: { params, error },
  }),
};

/** 信号受信のResult */
interface ReceiveSignalResult {
  signal: number[];
}

/** 信号受信 */
export const receiveSignal = {
  start: () => ({
    type: RemoconActionTypes.RECEIVE_SIGNAL_START as typeof RemoconActionTypes.RECEIVE_SIGNAL_START,
    payload: {},
  }),
  succeed: (result: ReceiveSignalResult) => ({
    type: RemoconActionTypes.RECEIVE_SIGNAL_SUCCEED as typeof RemoconActionTypes.RECEIVE_SIGNAL_SUCCEED,
    payload: { result },
  }),
  fail: (error: AxiosError) => ({
    type: RemoconActionTypes.RECEIVE_SIGNAL_FAIL as typeof RemoconActionTypes.RECEIVE_SIGNAL_FAIL,
    payload: { error },
  }),
};

/** アクション一覧 */
export type RemoconAction =
  | ReturnType<typeof initialize.start>
  | ReturnType<typeof initialize.succeed>
  | ReturnType<typeof initialize.fail>
  | ReturnType<typeof sendSignal.start>
  | ReturnType<typeof sendSignal.succeed>
  | ReturnType<typeof sendSignal.fail>
  | ReturnType<typeof receiveSignal.start>
  | ReturnType<typeof receiveSignal.succeed>
  | ReturnType<typeof receiveSignal.fail>;

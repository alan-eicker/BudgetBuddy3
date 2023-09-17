import { Dispatch, SetStateAction } from 'react';

export type UnknownFuntionType = (
  ...args: any[]
) => any | Promise<any> | Dispatch<SetStateAction<any>>;

export type PromiseReturnType = Promise<any>;

export type SetStateActionType = Dispatch<SetStateAction<any>>;

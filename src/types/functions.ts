import { Dispatch, SetStateAction } from 'react';

export type UnknownFuntionType<T> = (
  ...args: any[]
) => any | Promise<T> | Dispatch<SetStateAction<T>>;

export type PromiseReturnType<T> = Promise<T>;

export type SetStateActionType<T> = Dispatch<SetStateAction<T>>;

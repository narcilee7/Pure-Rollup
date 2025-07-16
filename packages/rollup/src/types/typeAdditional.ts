export type MaybePromise<T> = T | Promise<T>;
export type Awaitable<T> = T | Promise<T>;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};


export interface TypeGuards {
    isString: (value: any) => value is string;
    isNumber: (value: any) => value is number;
    isBoolean: (value: any) => value is boolean;
    isFunction: (value: any) => value is Function;
    isObject: (value: any) => value is object;
    isArray: (value: any) => value is any[];
    isNull: (value: any) => value is null;
    isUndefined: (value: any) => value is undefined;
    isPromise: (value: any) => value is Promise<any>;
    isRegExp: (value: any) => value is RegExp;
    isDate: (value: any) => value is Date;
    isError: (value: any) => value is Error;
}
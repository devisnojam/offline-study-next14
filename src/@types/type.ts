export type APIResponseBody<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export interface ServerActionResultSchema<T> {
  success: boolean;
  message?: string;
  data: T;
}

/** 가독성 타입 */
export type Throwable = never;
export type Redirect = never;

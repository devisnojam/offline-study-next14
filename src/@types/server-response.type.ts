interface BaseAPIResponseBody {
  success: boolean;
  message?: string;
  result?: unknown;
}

export interface APIResponseBody<D> extends BaseAPIResponseBody {
  success: true;
  message?: string;
  result: D;
}

export interface APIErrorResponseBody extends BaseAPIResponseBody {
  success: false;
  message: string;
  result?: unknown;
}

export interface ServerActionResultSchema<T> {
  success: boolean;
  message?: string;
  result: T;
}

/** 가독성 타입 */
export type Throwable = never;
export type Redirect = never;

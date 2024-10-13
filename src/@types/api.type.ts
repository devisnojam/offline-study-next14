export type APIResponseBody<T> = {
  success: boolean;
  message?: string;
  data: T;
};

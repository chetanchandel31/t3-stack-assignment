export type TypeResult<T> =
  | { isSuccess: true; result: T }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { isSuccess: false; errorMessages: string[]; details?: any };

export type TypeSetStateFunction<TypeState> = React.Dispatch<
  React.SetStateAction<TypeState>
>;

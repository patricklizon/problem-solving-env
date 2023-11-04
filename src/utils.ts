export type InputExpectedPairs<Fn extends (...args: any[]) => any> = [
  input: Parameters<Fn>,
  expected: ReturnType<Fn>,
];

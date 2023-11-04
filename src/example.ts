export const flatten = <T>(xs: readonly (T | T[])[]): T[] =>
  xs.reduce<T[]>(
    (acc, x) => (Array.isArray(x) ? [...acc, ...flatten(x)] : [...acc, x]),
    [],
  );

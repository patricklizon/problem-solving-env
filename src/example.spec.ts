import { describe, expect, it } from "vitest";

import * as all from "./example";

const fns = Object.values(all);
const solutions = fns.map((cb) => [cb.name, cb] as const);

type Fn = (typeof fns)[0];
type InputExpectedPairs = [input: Parameters<Fn>, expected: ReturnType<Fn>];

describe.each(solutions)("%s", (_, fn) => {
  it.each<InputExpectedPairs>([
    [[[1, 2, 3, 4, 5, 6, 7]], [1, 2, 3, 4, 5, 6, 7]],
    [[[1, [2, [3, [4, [5, [6, [7]]]]]]]], [1, 2, 3, 4, 5, 6, 7]],
    [[[[], [[[1]]], [[]], [[[], [2]]]]], [1, 2]],
  ])("flattens non empty array", (args, right) => {
    expect(fn(...args)).to.deep.equal(right);
  });

  it.each<InputExpectedPairs>([
    [[[]], []],
    [[[[[[[[[]]]]]]]], []],
    [[[[], [[[]]], [[]], [[[], []]]]], []],
  ])("flattens empty array", (args, right) => {
    expect(fn(...args)).to.deep.equal(right);
  });
});

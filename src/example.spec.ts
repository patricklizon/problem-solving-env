import { describe, expect, it } from "vitest";

import { flatten } from "./example";

const fns = [flatten];
const solutions = fns.map((cb, idx) => [idx, cb] as const);

type Fn = (typeof fns)[0];
type InputExpectedPairs = [input: Parameters<Fn>, expected: ReturnType<Fn>];

describe.each(solutions)("solution %s", (_, fn) => {
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

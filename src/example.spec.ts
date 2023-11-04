import { describe, expect, it } from "vitest";

import * as all from "./example";
import { type InputExpectedPairs } from "./utils";

const fns = Object.values(all);
const solutions = fns.map((cb) => [cb.name, cb] as const);

type Fn = (typeof fns)[0];
type TetsCases = InputExpectedPairs<Fn>;

describe.each(solutions)("%s", (_, fn) => {
  it.each<TetsCases>([
    [[[1, 2, 3, 4, 5, 6, 7]], [1, 2, 3, 4, 5, 6, 7]],
    [[[1, [2, [3, [4, [5, [6, [7]]]]]]]], [1, 2, 3, 4, 5, 6, 7]],
    [[[[], [[[1]]], [[]], [[[], [2]]]]], [1, 2]],
  ])("flattens non empty array", (params, right) => {
    expect(fn.apply(null, params)).to.deep.equal(right);
  });

  it.each<TetsCases>([
    [[[]], []],
    [[[[[[[[[]]]]]]]], []],
    [[[[], [[[]]], [[]], [[[], []]]]], []],
  ])("flattens empty array", (params, right) => {
    expect(fn.apply(null, params)).to.deep.equal(right);
  });
});

import { test } from "uvu";
import assert from "uvu/assert";

import { flatten } from "./example";

test("returns unmodified flat array", () => {
  const array = [1, 2, 3, 4, 5, 6, 7];
  const actual = flatten(array);
  const expected = [...array];

  assert.equal(actual, expected);
});

test("flattens deeply nested array", () => {
  const array = [1, [2, [3, [4, [5, [6, [7]]]]]]];
  const actual = flatten(array);
  const expected = [1, 2, 3, 4, 5, 6, 7];

  assert.equal(actual, expected);
});

test("flattens empty arrays", () => {
  const array = [[], [[[1]]], [[]], [[[], [2]]]];
  const actual = flatten(array);
  const expected: unknown[] = [1, 2];

  assert.equal(actual, expected);
});

test.run();

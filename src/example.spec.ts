import { test } from "uvu";

import { flatten } from "./example";
import { TestCases, runTestCases } from "./utils";

test("flattens non empty array", () => {
  const testCases: TestCases<typeof flatten> = [
    [[[1, 2, 3, 4, 5, 6, 7]], [1, 2, 3, 4, 5, 6, 7]],
    [[[1, [2, [3, [4, [5, [6, [7]]]]]]]], [1, 2, 3, 4, 5, 6, 7]],
    [[[[], [[[1]]], [[]], [[[], [2]]]]], [1, 2]],
  ];

  runTestCases(flatten, testCases);
});

test("flattens empty array", () => {
  const testCases: TestCases<typeof flatten> = [
    [[[]], []],
    [[[[[[[[[]]]]]]]], []],
    [[[[], [[[]]], [[]], [[[], []]]]], []],
  ];

  runTestCases(flatten, testCases);
});

test.run();

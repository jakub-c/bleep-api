import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { nextArrayIndex } from "./nextArrayIndex.mjs";

const testArray = ["C3", "D3", "Eb3"];

Deno.test("go back to 0 if the argument exceeds the index of array", () => {
  const result = nextArrayIndex(4, testArray);
  assertEquals(result, 0);
});

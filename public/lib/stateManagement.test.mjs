import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { reducer } from "./stateManagement.mjs";

Deno.test("increment colorIndex from 0", () => {
  const state = { colors: ["#00", "#fff"], colorIndex: 0 };
  const action = { type: "INCREMENT_COLOR_INDEX" };
  const nextState = reducer(state, action);
  assertEquals(nextState.colorIndex, 1);
});

Deno.test("increment colorIndex from last index of colors array", () => {
  const state = { colors: ["#00", "#fff"], colorIndex: 1 };
  const action = { type: "INCREMENT_COLOR_INDEX" };
  const nextState = reducer(state, action);
  assertEquals(nextState.colorIndex, 0);
});

Deno.test("increment scoreIndex from 0", () => {
  const state = {
    score: [
      ["C2", "D2", 1000],
      ["F2", "G2", 1000],
    ],
    scoreIndex: 0,
  };
  const action = { type: "INCREMENT_SCORE_INDEX" };
  const nextState = reducer(state, action);
  assertEquals(nextState.scoreIndex, 1);
});

Deno.test("increment scoreIndex from 1", () => {
  const state = {
    score: [
      ["C2", "D2", 1000],
      ["F2", "G2", 1000],
    ],
    scoreIndex: 1,
  };
  const action = { type: "INCREMENT_SCORE_INDEX" };
  const nextState = reducer(state, action);
  assertEquals(nextState.scoreIndex, 0);
});

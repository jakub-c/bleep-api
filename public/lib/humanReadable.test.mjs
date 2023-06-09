import { assertEquals } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { humanReadable } from "./humanReadable.mjs";

Deno.test("replace b with ♭", () => {
  const result = humanReadable("Cb2");
  assertEquals(result, "C♭");
});

Deno.test("don't add ♭ if there's no 'b' in the string", () => {
  const result = humanReadable("C2");
  assertEquals(result, "C");
});

Deno.test("on empty string return empty string", () => {
  const result = humanReadable("");
  assertEquals(result, "");
});

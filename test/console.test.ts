import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("the console distinguishes the scripted demo from offline services", async () => {
  const html = await readFile("console/index.html", "utf8");
  assert.match(html, /Scripted demo \(no model connection\)/);
  assert.match(html, /listener.*active.*inactive/);
  assert.match(html, /shop online/);
  assert.match(html, /shop offline/);
  assert.match(html, /h\.model === "offline"/);
});

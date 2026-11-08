import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

const files = readdirSync("test/workshop")
  .filter((name) => !name.startsWith("._") && name.endsWith(".test.ts"))
  .map((name) => join("test/workshop", name));
const result = spawnSync(process.execPath, ["--import", "tsx", "--test", "--test-concurrency=2", ...process.argv.slice(2), ...files], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);

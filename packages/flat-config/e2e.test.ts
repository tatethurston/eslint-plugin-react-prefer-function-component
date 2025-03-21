import { spawnSync } from "child_process";
import { describe, beforeAll, it, expect } from "vitest";

function run(cmd: string) {
  return spawnSync(cmd, { shell: true, encoding: "utf8" });
}

function removeAbsolutePathToEslintFile(str: string): string {
  return str.replace(__dirname, "");
}

describe("flat config", () => {
  beforeAll(() => process.chdir(__dirname));

  it("flags errors", () => {
    const result = run("pnpm eslint index.jsx");
    expect(removeAbsolutePathToEslintFile(result.stdout))
      .toMatchInlineSnapshot(`
"
/index.jsx
  3:14  error  Class component should be written as a function  react-prefer-function-component/react-prefer-function-component

✖ 1 problem (1 error, 0 warnings)

"
`);
    expect(result.status).toEqual(1);
  });
});

/** @type {import('jest').Config} */
export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  // TS ESM imports are referenced with .js extensions, but jest will fail to find
  // the uncompiled file because it ends with .ts and is looking for .js.
  moduleNameMapper: {
    "(.+)\\.jsx?": "$1",
    "(.+)\\.mjs": "$1.mts",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx|mjs|mts)$": "babel-jest",
  },
};

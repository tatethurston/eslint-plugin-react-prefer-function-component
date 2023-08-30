import type { ESLint } from "eslint";
import preferFunctionComponent from "./prefer-function-component/index.js";

const plugin: ESLint.Plugin = {
  rules: {
    "prefer-function-component": preferFunctionComponent.default,
  },
};

const config: ESLint.Plugin = {
  configs: {
    recommended: {
      plugins: {
        "prefer-function-component": plugin,
      },
      rules: {
        "prefer-function-component/prefer-function-component": "error",
      },
    },
  },
};

export default config;

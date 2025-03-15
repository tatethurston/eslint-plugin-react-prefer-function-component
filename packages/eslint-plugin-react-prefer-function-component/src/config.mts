import type { ESLint } from "eslint";
import preferFunctionComponent from "./prefer-function-component/index.js";

const plugin: ESLint.Plugin = {
  rules: {
    "react-prefer-function-component": preferFunctionComponent.default,
  },
};

const config = {
  configs: {
    recommended: {
      plugins: {
        "react-prefer-function-component": plugin,
      },
      rules: {
        "react-prefer-function-component/prefer-function-component": "error",
      },
    },
  },
} satisfies ESLint.Plugin;

export default config;

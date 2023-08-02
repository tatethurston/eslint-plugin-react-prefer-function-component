import type { ESLint } from "eslint";
import PreferFunctionComponent from "./prefer-function-component";

const plugin: ESLint.Plugin = {
  configs: {
    recommended: {
      plugins: ["react-prefer-function-component"],
      rules: {
        "react-prefer-function-component/react-prefer-function-component":
          "error",
      },
    },
  },
  rules: {
    "react-prefer-function-component": PreferFunctionComponent,
  },
};

module.exports = plugin;

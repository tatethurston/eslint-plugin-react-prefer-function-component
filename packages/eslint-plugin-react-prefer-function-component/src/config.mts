/* c8 ignore start */
import type { Linter } from "eslint";
import preferFunctionComponent from "./prefer-function-component/index.js";

const recommended = {
  plugins: {
    "react-prefer-function-component": {
      rules: {
        "react-prefer-function-component": preferFunctionComponent.default,
      },
    },
  },
  rules: {
    "react-prefer-function-component/react-prefer-function-component": "error",
  },
} satisfies Linter.Config;

interface Config {
  configs: {
    recommended: Linter.Config;
  };
}

const config: Config = {
  configs: { recommended },
};

export default config;

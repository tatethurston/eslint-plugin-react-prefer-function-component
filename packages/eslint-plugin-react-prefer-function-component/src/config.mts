/* c8 ignore start */
import type { Linter } from "eslint";
import preferFunctionComponent from "./prefer-function-component/index.js";

interface Config {
  configs: {
    recommended: Linter.Config;
  };
}

const config: Config = {
  configs: {
    recommended: {
      plugins: {
        "react-prefer-function-component": {
          rules: {
            "react-prefer-function-component": preferFunctionComponent.default,
          },
        },
      },
      rules: {
        "react-prefer-function-component/react-prefer-function-component":
          "error",
      },
    },
  },
};

export default config;

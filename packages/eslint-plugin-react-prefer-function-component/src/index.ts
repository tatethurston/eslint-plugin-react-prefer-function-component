import PreferFunctionComponent from "./prefer-function-component";

module.exports = {
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

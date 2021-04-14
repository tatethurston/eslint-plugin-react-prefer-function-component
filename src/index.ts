import PreferFunctionComponent from "./prefer-function-component";

module.exports = {
  configs: {
    plugins: ["react-prefer-function-component"],
    recommended: {
      "react-prefer-function-component/react-prefer-function-component":
        "error",
    },
  },
  rules: {
    "react-prefer-function-component": PreferFunctionComponent,
  },
};

import PreferFunctionComponent from "./prefer-function-component";

export default {
  configs: {
    plugins: ["prefer-function-component"],
    recommended: {
      "prefer-function-component/prefer-function-component": "error",
    },
  },
  rules: {
    "prefer-function-component": PreferFunctionComponent,
  },
};

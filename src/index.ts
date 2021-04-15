import PreferFunctionComponent from "./prefer-function-component";

module.exports = {
  configs: {
    plugins: ["react-prefer-function-component"],
    recommended: {
      rules: {
        "react-prefer-function-component/react-prefer-function-component":
          "error",
      },
    },
    settings: {
      react: {
        // Regex for Component Factory to use (defaults to "createReactClass")
        createClass: "createReactClass",
        // Pragma to use (defaults to "React")
        pragma: "React",
        // Fragment to use (may be a property of <pragma>), default to "Fragment"
        fragment: "Fragment",
        // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        version: "detect",
      },
    },
  },
  rules: {
    "react-prefer-function-component": PreferFunctionComponent,
  },
};

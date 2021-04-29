module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      // passed to eslint-plugin-react
      // see https://github.com/yannickcr/eslint-plugin-react#configuration
      createClass: "createReactClass",
      pragma: "React",
      fragment: "Fragment",
      version: "detect",
    },
  },
  plugins: ["react-prefer-function-component"],
  rules: {
    "react-prefer-function-component/react-prefer-function-component": [
      "error",
      { allowComponentDidCatch: false },
    ],
  },
};

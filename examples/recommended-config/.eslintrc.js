module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-prefer-function-component"],
  extends: ["plugin:react-prefer-function-component/recommended"],
};

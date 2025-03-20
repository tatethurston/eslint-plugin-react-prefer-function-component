import preferFunctionComponent from "eslint-plugin-react-prefer-function-component/config";

export default [
  {
    files: ["*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  preferFunctionComponent.configs.recommended,
];

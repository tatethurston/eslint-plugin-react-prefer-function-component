import eslint from "@eslint/js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import preferFC from "eslint-plugin-react-prefer-function-component/config";

export default [
  { files: ["**/*.{js,jsx}"] },
  eslint.configs.recommended,
  reactRecommended,
  preferFC.configs.recommended,
];

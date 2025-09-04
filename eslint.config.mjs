import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";

const commonRules = {
  semi: ["error", "always"],
  quotes: ["error", "double"],
  indent: ["error", 2],
  "comma-dangle": ["error", "always-multiline"],
  curly: "error",
  "no-console": "warn",
  eqeqeq: "error",
  "prefer-const": "error",
  "no-var": "error",
  "react/jsx-uses-react": "off",
  "react/react-in-jsx-scope": "off",
  // Plugins rules
  "import/no-unresolved": "error",
  "jsdoc/check-alignment": "warn",
  "security/detect-object-injection": "warn",
  "promise/always-return": "warn",
};

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      react,
      import: importPlugin,
      jsdoc,
      security,
      promise,
    },
    rules: {
      ...commonRules,
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      jsdoc,
      security,
      promise,
    },
    rules: {
      ...commonRules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    rules: {
      "no-unused-expressions": "off",
    },
  },
  {
    files: ["config/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
];

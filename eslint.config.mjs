import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import jsdoc from "eslint-plugin-jsdoc";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";
import tsParser from "@typescript-eslint/parser";

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
  // Archive repo: legacy ceremonial scripts carry dead identifiers; surface,
  // don't block. New eslint-10 rule kept visible as a warning likewise.
  "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "caughtErrors": "none" }],
  "preserve-caught-error": "warn",
  // Plugins rules
  "jsdoc/check-alignment": "warn",
  "security/detect-object-injection": "warn",
  "promise/always-return": "warn",
};

export default [
  { ignores: ["dist/", "coverage/", "node_modules/"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      jsdoc,
      security,
      promise,
    },
    rules: {
      ...commonRules,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: {
      "@typescript-eslint": tseslint,
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
    // Static browser apps — marked is loaded as a CDN global.
    files: ["apps/**/*.js"],
    languageOptions: {
      globals: { marked: "readonly" },
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

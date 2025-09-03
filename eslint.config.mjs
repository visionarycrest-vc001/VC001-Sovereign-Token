import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
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
  "no-unused-vars": "warn",
  // Plugin rules
  "import/no-unresolved": "off", // Can be problematic in monorepos
  "jsdoc/check-alignment": "warn",
  "security/detect-object-injection": "warn",
  "promise/always-return": "warn",
};

export default [
  // Global ignores
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.min.js",
      "**/AppData/",
      "**/Extensions/",
      "public/",
      ".github/workflows/eslint.config.js", // Avoid self-reference
    ],
  },
  // Base ESLint recommended rules
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
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
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
      import: importPlugin,
      jsdoc,
      security,
      promise,
    },
    rules: {
      ...commonRules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off", // Disable base rule in favor of TypeScript version
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

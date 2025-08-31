import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  tseslint.configs.recommended, // Enable recommended TypeScript rules
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Add custom rules below
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/explicit-function-return-type": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

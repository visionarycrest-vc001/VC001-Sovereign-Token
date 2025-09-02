import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        document: "readonly",
        window: "readonly",
        fetch: "readonly"
      },
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "curly": "error",
      "no-console": "warn",
      "eqeqeq": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.test.js"],
    rules: {
      "no-unused-expressions": "off",
    },
  },
  {
    files: ["scripts/**/*.js", ".github/**/*.js"],
    rules: {
      "no-console": "off",
    },
  },
];

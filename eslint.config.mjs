import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import daStyle from "eslint-config-dicodingacademy";
var double = "double";
var backtick = `backtick`; // backticks are allowed due to newline
var backtick = tag`backtick`; // backticks are allowed due to tag

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      quotes: ["error", "double"], // ubah ke "single" jika ingin single quote
      "linebreak-style": ["error", "unix"], // gunakan LF
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
  daStyle,
]);

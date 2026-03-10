import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import css from "@eslint/css";
import html from "@html-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,js,mjs,cjs,vue}"],
    plugins: {
      js,
    },
    extends: [
      "js/recommended",
      ...pluginVue.configs["flat/strongly-recommended"],
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true,
          externalIgnores: ["li", "button"],
        },
      ],
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
  {
    files: ["**/*.html"],
    plugins: { html },
    language: "html/html",
    extends: ["html/recommended"],
    rules: {
      "html/indent": ["error", 2],
      "html/require-closing-tags": [
        "error",
        { selfClosing: "always" },
      ],
      "html/no-extra-spacing-attrs": [
        "error",
        { enforceBeforeSelfClose: true },
      ],
    },
  },
  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),
  // eslintConfigPrettier
]);

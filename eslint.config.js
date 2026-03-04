import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
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
    },
  },
  pluginVue.configs["flat/strongly-recommended"],
]);

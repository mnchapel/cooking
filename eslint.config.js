import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { defineConfig, globalIgnores } from "eslint/config";

import globals from "globals";

import eslintJs from "@eslint/js";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

import eslintCss from "@eslint/css";
import eslintJson from "@eslint/json";
import eslintHtml from "@html-eslint/eslint-plugin";

import pluginImportX from "eslint-plugin-import-x";
import pluginUnicorn from "eslint-plugin-unicorn";

import vueParser from "vue-eslint-parser";
import pluginVue from "eslint-plugin-vue";

import eslintConfigPrettier from "eslint-config-prettier/flat";


export default defineConfig([
  // Common rules
  {
    name: "app/global-rules",
    files: ["**/*.{ts,js,mjs,cjs,vue}"],
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ["./jsconfig.json", "./tsconfig.json"],
        }),
      ],
    },
    plugins: {
      "js": eslintJs,
      "import-x": pluginImportX,
      "unicorn": pluginUnicorn,
    },
    extends: [
      tsEslint.configs.recommended,
      tsEslint.configs.stylistic,
      "js/recommended",
      "import-x/flat/recommended",
      pluginUnicorn.configs.recommended,
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // JS rules
  {
    files: ["**/*.{ts,js,mjs,cjs,vue}"],
    rules: {
      // 'eslint' package rules
      "complexity": ["error", { max: 10 }],
      "no-nested-ternary": ["error"],
      "no-restricted-syntax": [
        "error",
        {
          selector: "IfStatement > IfStatement.alternate",
          message: "Avoid `else if`. Prefer early returns or ternary operators.",
        },
      ],
      // 'eslint-plugin-import-x' packages rules including its
      // 'eslint-import-resolver-typescript' package)
      "import-x/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/helpers",
              from: "./src",
              except: ["./helpers"],
              message:
                "Architecture Violation: Utility helpers must be pure functions and cannot depend on Vue components, store, or views.",
            },
            {
              target: "./src",
              from: "./scripts",
              message:
                "Dependency Violation: Source code (src) cannot import backend/build scripts to avoid Node.js runtime leaks in the browser bundle.",
            },
            {
              target: "./src/components",
              from: ["./src/views", "./src/layouts"],
              message:
                "Design Pattern Violation: Reusable UI components must be context-agnostic. Do not import views or layouts into the components directory.",
            },
            {
              target: "./src/composables",
              from: ["./src/views", "./src/components", "./src/layouts"],
              message:
                "Architecture Violation: Business logic (composables) should not depend on specific view entry points.",
            },
          ],
        },
      ],
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
        },
      ],
      // 'eslint-plugin-unicorn' package rules
      "unicorn/better-regex": ["warn"], // Simplify regexes: /[0-9]/ → /\d/
      "unicorn/consistent-destructuring": ["warn"], // Use destructured vars consistently
      "unicorn/custom-error-definition": ["error"], // Correct Error subclassing
      "unicorn/error-message": ["error"], // Enforce passing a message
      "unicorn/filename-case": ["off"], // Vue uses PascalCase, tests use camelCase
      "unicorn/import-style": ["error"], // Enforce specific import styles per module
      "unicorn/no-array-callback-reference": ["off"], // arr.filter(isValid) is fine
      "unicorn/no-array-reduce": ["off"], // reduce is useful for aggregations
      "unicorn/no-await-expression-member": ["off"], // (await fetch()).json() is fine
      "unicorn/no-for-loop": ["error"], // Do not use a for loop
      "unicorn/no-null": ["off"], // We use null for database values
      "unicorn/no-unused-properties": ["warn"], // Dead code detection
      "unicorn/no-useless-undefined": ["off"], // mockResolvedValue(undefined) for TS
      "unicorn/prefer-node-protocol": ["error"], // Use the node: protocol when importing
      "unicorn/prefer-switch": ["error", { emptyDefaultCase: "no-default-case" }], // Prefer switch over multiple else-if
      "unicorn/prevent-abbreviations": ["off"], // props, e, Db are fine
      "unicorn/relative-url-style": ["error", "always"], // relative URL should be prefixed with ./ to be consistent with JS/TS import
    },
  },
  // TS rules
  {
    files: ["**/*.{ts,vue}"],
    rules: {
      // 'eslint' package rules
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message: "Use literal unions or `as const` objects instead of enums.",
        },
      ],
      // 'typescript-eslint' package rules
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "never",
        },
      ],
    },
  },
  // Vue rules
  {
    files: ["**/*.vue"],
    extends: [
      ...pluginVue.configs["flat/strongly-recommended"],
    ],
    rules: {
      // 'eslint-plugin-vue' package rules
      "vue/multi-word-component-names": [
        "error",
        { ignores: ["App", "Layout"] },
      ],
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: { max: 3 },
          multiline: { max: 1 },
        },
      ],
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true,
          externalIgnores: ["li", "button"],
        },
      ],
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase",
        { registeredComponentsOnly: false },
      ],
      "vue/custom-event-name-casing": ["error", "camelCase"],
      "vue/define-props-destructuring": [
        "error",
        { destructure: "only-when-assigned" },
      ],
      "vue/match-component-file-name": [
        "error",
        {
          extensions: ["vue"],
          shouldMatchCase: true,
        },
      ],
      "vue/max-props": ["error", { maxProps: 6 }],
      "vue/max-template-depth": ["error", { maxDepth: 8 }],
      "vue/no-unused-emit-declarations": ["error"],
      "vue/no-unused-properties": [
        "error",
        {
          groups: [
            "props",
            "data",
            "computed",
            "methods",
          ],
        },
      ],
      "vue/no-unused-refs": ["error"],
      "vue/prefer-use-template-ref": ["error"],
      "vue/require-explicit-slots": ["warn"],
      "vue/require-expose": ["warn"],
      "vue/no-restricted-syntax": [
        "error",
        {
          selector: 'CallExpression[callee.property.name="push"][callee.object.name="router"] > Literal:first-child',
          message: "Use named routes with RouteNames instead of hardcoded path strings.",
        },
        {
          selector:
            'CallExpression[callee.property.name="push"][callee.object.name="router"] > TemplateLiteral:first-child',
          message: "Use named routes with RouteNames instead of template literals.",
        },
      ],
    },
  },
  // JSON rules
  {
    name: "app/json-rules",
    files: ["**/*.json"],
    ignores: ["package-lock.json"],
    plugins: { json: eslintJson },
    language: "json/json",
    extends: ["json/recommended"],
  },
  // JSONC rules
  {
    name: "app/jsonc-rules",
    files: ["**/*.jsonc"],
    plugins: { json: eslintJson },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  // CSS rules
  {
    name: "app/css-rules",
    files: ["**/*.css"],
    // @ts-expect-error it's a reported bug: https://github.com/eslint/eslint/issues/20287
    plugins: { css: eslintCss },
    language: "css/css",
    extends: ["css/recommended"],
  },
  // HTML rules
  {
    name: "app/html-rules",
    files: ["**/*.html"],
    plugins: { html: eslintHtml },
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
  eslintConfigPrettier
]);

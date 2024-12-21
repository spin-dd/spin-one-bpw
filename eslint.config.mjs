// @ts-check

import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      "no-undef": "off",
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
  },
  eslintConfigPrettier,
);

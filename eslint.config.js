const js = require("@eslint/js");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const sonarjsPlugin = require("eslint-plugin-sonarjs");
const vitestPlugin = require("eslint-plugin-vitest");
const globals = require("globals");

function makeMicroMatchPath(path, extensions) {
  const dict = {
    js: ["js", "cjs", "mjs"],
    ts: ["ts", "cts", "mts"],
  };
  const exts = Array.from(new Set(extensions.map((ext) => dict[ext]).flat()));
  const first = exts[0];
  if (!first) throw new Error("did not match extensions");
  const extensionPattern = exts.length > 1 ? `{${exts.join(",")}}` : first;

  return `${path}.${extensionPattern}`;
}

/**
 * Base configuration without rules
 */
const eslintBaseConfig = {
  ignores: [".git/**", "**/node_modules/**"],
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
};

/**
 * Shared rules between js and ts
 */
const commonJsTsRulesConfig = {
  files: [makeMicroMatchPath("src/**/*", ["js", "ts"])],
  rules: {
    "spaced-comment": ["warn", "always"],
    "constructor-super": "error",
    "no-console": "error",
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      {
        selector: "TSEnumDeclaration",
        message:
          "In modern TypeScript, you may not need an enum when an object with `as const` could suffice.",
      },
    ],
  },
};

/**
 * ESLint's recommended rules for js files
 */
const jsRecommendedRulesConfig = {
  files: [makeMicroMatchPath("src/**/*", ["js"])],
  rules: js.configs.recommended.rules,
};

/**
 * Set of strict rules for typescript
 */
const typescriptRulesConfig = {
  files: [makeMicroMatchPath("**/*", ["ts"])],
  plugins: {
    "@typescript-eslint": typescriptPlugin,
  },
  languageOptions: {
    parser,
    parserOptions: {
      ecmaFeatures: { modules: true },
      project: "./tsconfig.json",
    },
    globals: globals.node,
  },
  rules: {
    ...typescriptPlugin.configs["eslint-recommended"].rules,
    ...typescriptPlugin.configs.recommended.rules,
    ...typescriptPlugin.configs["recommended-requiring-type-checking"].rules,

    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/unified-signatures": "warn",
    "@typescript-eslint/no-dynamic-delete": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "should", "has", "can", "did", "will"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: "variable",
        modifiers: ["destructured"],
        format: null,
      },
    ],
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": ["error"],
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error"],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": ["error"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-return-await": "off",
    "@typescript-eslint/return-await": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        ignoreRestSiblings: true,
        vars: "all",
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-namespace": [
      "error",
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
};

/**
 * Set of rules for sonarjs
 */
const sonarjsRulesConfig = {
  files: [makeMicroMatchPath("**/*", ["js", "ts"])],
  plugins: {
    sonarjs: sonarjsPlugin,
  },
  rules: {
    ...sonarjsPlugin.configs.recommended.rules,
    "sonarjs/elseif-without-else": "error",
    "sonarjs/no-inverted-boolean-check": "error",
  },
};

/**
 * Set of rules for import
 */
const importRulesConfig = {
  files: [makeMicroMatchPath("**/*", ["js", "ts"])],
  plugins: {
    import: importPlugin,
  },
  rules: {
    ...importPlugin.configs.rules,
    "import/no-unresolved": "off", // check done by typescript
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-default-export": "warn",
  },
};

/**
 * Override for configuration files in root catalog
 */
const configFilesConfigOverride = {
  files: [makeMicroMatchPath("*", ["ts", "js"])],
  rules: {
    // "import/no-default-export": "off",
  },
};

/**
 * Override for utils file
 */
const utilsConfigOverride = {
  files: [makeMicroMatchPath("src/**/utils/**/*", ["ts"])],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};

/**
 * Override for test files
 */
const specConfigOverride = {
  files: [makeMicroMatchPath("src/**/*.spec", ["ts"])],
  plugins: {
    jest: vitestPlugin,
  },
  languageOptions: {
    globals: globals.node,
  },
  rules: {
    // has to be disabled in order to use chai ie. `expect().to.be.true`
    "@typescript-eslint/no-unused-expressions": "off",
  },
};

/**
 * Override for TS ambient module files
 */
const ambientModulesConfigOverride = {
  files: [makeMicroMatchPath("src/**/*.d", ["ts"])],
  rules: {
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};

const rules = [
  commonJsTsRulesConfig,
  importRulesConfig,
  jsRecommendedRulesConfig,
  sonarjsRulesConfig,
  typescriptRulesConfig,
];

const overrides = [
  specConfigOverride,
  utilsConfigOverride,
  configFilesConfigOverride,
];

module.exports = [eslintBaseConfig].concat(rules).concat(overrides);

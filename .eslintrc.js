module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    // a lot of rules here
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  plugins: ["react", "prettier"],
  rules: {
    // semicolons
    semi: [2, "always"],
    // max-len
    "max-len": [
      "error",
      {
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    // https://dev.to/chandelieraxel/why-do-react-need-to-be-in-scope-for-jsx-3hen
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    //https://stackoverflow.com/questions/76624993/prettier-3-0-0-typeerror-prettier-resolveconfig-sync-is-not-a-function
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
      },
    ],
  },
};

module.exports = {
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
      'plugin:react/recommended'
  ],
  plugins: ['react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2019,
      project: './tsconfig.json',
      sourceType: 'module',
  },
  rules: {
      "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "never" }],
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/camelcase": ["error", {"properties": "never"}],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off"
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
module.exports = {
  extends: ['universe/native', 'universe/shared/typescript-analysis'],
  globals: {
    __DEV__: true,
    alert: true,
    navigator: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};

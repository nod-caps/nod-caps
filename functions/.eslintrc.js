module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "max-len": ["error", {"code": 120}],
    "linebreak-style": 0,
  },
  parserOptions: {
    "ecmaVersion": 2017,
  },
};

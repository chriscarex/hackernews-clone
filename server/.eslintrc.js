module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: "standard",
  plugins: ["import", "prettier", "babel"],
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  
  rules: {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": [
      2,
      {
        devDependencies: [
          "**/*.test.js",
          "./*.js",
        ],
        optionalDependencies: false,
        peerDependencies: false
      }
    ],

    "no-unused-expressions": 0,
    quotes: [2, "single", { avoidEscape: true }],
    "no-underscore-dangle": 0,
    "lines-between-class-members": 0,
    "no-restricted-syntax": 0,
    "arrow-body-style": 0,
    "no-return-assign": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "comma-dangle": 0,
    "func-names": [2, "as-needed"],
    "import/prefer-default-export": 0,
    "arrow-parens": 0,
    semi: [2, "never"],
    "max-len": [2, 200, 4, { ignoreUrls: true }],
    "no-unexpected-multiline": 2
  }
};

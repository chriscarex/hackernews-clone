module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['import', 'prettier', 'react', 'cypress', 'babel', 'chai-friendly'],
  env: {
    browser: true,
    node: true,
    jest: true,
    'cypress/globals': true
  },
  rules: {
    'react/no-unescaped-entities': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'no-confusing-arrow': 0,
    'implicit-arrow-linebreak': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['tools/**', 'config/**', '**/*.test.js', './*.js', 'src/services/**'],
        optionalDependencies: false,
        peerDependencies: false
      }
    ],

    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    indent: 0,
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    // 'object-curly-newline': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'no-underscore-dangle': 0,
    'lines-between-class-members': 0,
    'no-restricted-syntax': 0,
    'arrow-body-style': 0,
    'no-await-in-loop': 0,
    'no-nested-ternary': 0,
    'no-loop-func': 0,
    radix: 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    'func-names': [2, 'as-needed'],
    'import/prefer-default-export': 0,
    'arrow-parens': 0,
    semi: [2, 'never'],
    'max-len': [2, 200, 4, { ignoreUrls: true }],
    'no-unexpected-multiline': 2
  }
}

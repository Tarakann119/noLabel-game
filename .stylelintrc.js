module.exports = {
  'extends': 'stylelint-config-standard-scss',
  'plugins': [
    'stylelint-scss',
  ],
  'rules': {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-invalid-double-slash-comments': true,
    'block-no-empty': true,
    'comment-no-empty': true,
    'no-empty-source': true,
    'color-no-invalid-hex': true,
    'function-url-quotes': 'always',
    'no-descending-specificity': null,
    'scss/double-slash-comment-whitespace-inside': null,
  },
};

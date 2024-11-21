module.exports = {
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['unused-imports'],
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'interface-name-prefix': 'off',
        'explicit-function-return-type': 'off',
        'explicit-module-boundary-types': 'off',
        'no-var-requires': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
    }
}

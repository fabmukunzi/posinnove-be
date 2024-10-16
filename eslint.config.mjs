import globals from 'globals'
import pluginJs from '@eslint/js'
import babelParser from '@babel/eslint-parser'

export default [
  {
    // Apply the rules to all .js files in the project
    files: ['*.js'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node, // Enable Node.js globals
      },
    },
    env: {
      node: true, // Enable Node.js environment
      es2021: true, // Enable ES2021 features
    },
    rules: {
      'no-unused-vars': 'error', // Warn about unused variables
      'prettier/prettier': 'error', // Treat Prettier issues as errors
      eqeqeq: ['error', 'always'], // Enforce === and !==
      curly: 'error', // Require curly braces for all control statements
      'no-console': 'warn', // Warn on console.log statements
      'prefer-const': 'warn', // Suggest using const for variables that are never reassigned
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'single'], // Enforce the use of single quotes
      'max-len': ['warn', { code: 80 }], // Warn if lines exceed 80 characters
    },
  },
  pluginJs.configs.recommended,
]

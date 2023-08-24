/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.ts', '**/tests/**/*.test.ts'], // Adjust the pattern based on your test file location
  modulePaths: ['*/src'],
  collectCoverage: true
};
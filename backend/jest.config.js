/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/dist/tests/*.test.js'], // Adjust the pattern based on your test file location
  modulePaths: ['*/dist/src/'],
};
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss|png|svg|jpg)$': 'identity-obj-proxy',
  },
  // transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', {
      'ts-jest': {
        useESM: true, // Ensure TypeScript uses ESM mode
      },
    }], // Use babel-jest for JSX/JS files
  },
  testMatch: ['**/tests/**/*.(test|spec).(ts|tsx|js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

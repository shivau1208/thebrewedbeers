import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(scss|css|svg|png)$': 'identity-obj-proxy', // Mock static assets
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
  },
  testMatch: ['**/tests/**/*.(test|spec).(ts|tsx|js|jsx)'], // Match test files
};

export default config;

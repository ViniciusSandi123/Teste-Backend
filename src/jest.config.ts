import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],
  rootDir: './',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

export default config;
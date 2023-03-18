import dotenv from 'dotenv';
dotenv.config();

export default {
  setupFilesAfterEnv: ['./jest.setup.js'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  // moduleNameMapper: {
  //   "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/__mocks__/fileMock.ts",
  //   '\\.(scss)$': '<rootDir>/jest/_mocks_/styleMock.ts',
  // },
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleNameMapper: {
    '^@bounce/providers/(.*)$': '<rootDir>/../../libs/providers/src/$1',
    '^@bounce/core/(.*)$': '<rootDir>/../../libs/core/src/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig.json'
    }
  }
};

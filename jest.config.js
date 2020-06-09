module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@testing': '<rootDir>/src/testing/index.ts'
  }
};

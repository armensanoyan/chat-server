export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  roots: ['<rootDir>/tests'],
  verbose: true
}

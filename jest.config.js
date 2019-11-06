module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  roots: ['<rootDir>/src/app/'],
  testMatch: ['**/app/**/**.spec.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/e2e"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  notify: true,
  verbose: true,
};

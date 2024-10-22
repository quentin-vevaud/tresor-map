import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      exclude: ["src/index.ts"],
      include: ["src/"],
      provider: "istanbul",
      reportOnFailure: true,
      reporter: ["lcov", "html"],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
    include: ["tests/**/*.test.ts"],
    logHeapUsage: true,
    passWithNoTests: true,
    reporters: ["basic"],
    setupFiles: ["./tests/setup.ts"],
    testTimeout: 10000,
  },
});

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths({})],
  test: {
    coverage: {
      enabled: true,
      exclude: [
        "**/BFFLogger.ts",
        "**/DbClient.ts",
        "**/GetRandomInt.ts",
        "**/HttpClient.ts",
        "**/JwtUtils.ts",
        "**/LoggerConfig.ts",
        "**/ParamsSerializer.ts",
        "**/SNSClient.ts",
        "**/SecretClient.ts",
        "**/generated/**",
        "src/index.ts",
        "src/infrastructure/app.ts",
        "src/infrastructure/swagger",
      ],
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
    include: ["tests-vitest/**/*.test.ts"],
    logHeapUsage: true,
    passWithNoTests: true,
    reporters: ["basic"],
    setupFiles: ["dotenv/config", "./tests-vitest/setup.ts"],
    testTimeout: 10000,
  },
});

import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    semi: true,
    printWidth: 100,
    trailingComma: "all",
  },
  lint: {
    env: {
      builtin: true,
    },
    ignorePatterns: ["*.js", "dist", "node_modules", ".vscode", "package.json", "docs", "examples"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    globals: true,
    root: "./src",
    include: ["./__tests__/**/*.test.ts"],
  },
  pack: {
    entry: ["src/index.ts"],
    outDir: "dist",
    clean: true,
    format: ["esm", "cjs"],
    dts: true,
    outputOptions: {
      exports: "named",
    },
    treeshake: true,
    fixedExtension: true,
    deps: {
      onlyBundle: false,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  run: {
    tasks: {
      "lint:eslint": {
        cache: false,
        command: "eslint .",
      },
      "test:integration": {
        cache: false,
        command: "sh scripts/integration-test.sh",
      },
      "release:patch": {
        cache: false,
        command: "npm version patch",
      },
      "release:minor": {
        cache: false,
        command: "npm version minor",
      },
      "release:alpha": {
        cache: false,
        command: "npm version prerelease --preid alpha",
      },
      "release:beta": {
        cache: false,
        command: "npm version prerelease --preid beta",
      },
    },
  },
});

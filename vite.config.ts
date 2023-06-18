import { UserConfigExport } from "vitest/config";

const config: UserConfigExport = {
  test: {
    globals: false,
    environment: "node",
  },
};

export default config;

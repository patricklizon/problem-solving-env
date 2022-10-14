import { UserConfigExport } from "vitest/config";

const config: UserConfigExport = {
  test: {
    globals: true,
    environment: "node",
  },
};

export default config;

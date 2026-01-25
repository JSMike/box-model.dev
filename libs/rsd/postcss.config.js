import path from "node:path";
import { fileURLToPath } from "node:url";
import babelConfig from "./babel.config.js";

const rsdRoot = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(rsdRoot, "../..");

export default {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      cwd: workspaceRoot,
      include: [
        "libs/rsd/src/**/*.{js,jsx,mjs,ts,tsx}",
        "node_modules/react-strict-dom/**/*.js",
      ],
      babelConfig: babelConfig,
      useLayers: true,
    },
  },
};

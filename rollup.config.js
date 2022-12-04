/**
 * Rollup 설정 모듈
 *
 * @author RWB
 * @since 2022.06.06 Mon 17:44:31
 */
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { resolve } from 'path';
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
const extensions = ["js", "jsx", "ts", "tsx", "mjs"];
const packageJson = require("./package.json");
const config = [
  {
    external: [/node_modules/],
    input: resolve(__dirname, "./src/components/index.ts"),
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      postcss({
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
        use: ["sass"],
        inject: {
          insertAt: "top",
        },
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions,
      }),
      commonjs({ include: "node_modules/**" }),
      peerDepsExternal(),
      terser(),
      typescript({ tsconfig: "./tsconfig.json" }),
      external(),
      nodeResolve({ extensions }),
    ],
  },
];
export default config;

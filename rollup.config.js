/**
 * Rollup 설정 모듈
 *
 * @author RWB
 * @since 2022.06.06 Mon 17:44:31
 */
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from 'tailwindcss'
const tailwindConfig = require('./tailwind.config.js')
const extensions = ["js", "jsx", "ts", "tsx", "mjs"];
const pkg = require("./package.json");
const config = [
  {
    external: [/node_modules/],
    input: "./src/components/index.ts",
    output: [
      {
        dir: "./dist",
        format: "cjs",
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      nodeResolve({ extensions }),
      babel({
        exclude: "node_modules/**",
        extensions,
        include: ["src/**/*"],
      }),
      commonjs({ include: "node_modules/**" }),
      peerDepsExternal(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        use: ["sass"],
        plugins: [tailwindcss(tailwindConfig)],
      }),
    ],
  },
];
export default config;

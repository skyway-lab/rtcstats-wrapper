import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";

export default {
  input: "./src/main.js",
  output: {
    file: "./dist/rtcstats-wrapper.js",
    format: "umd",
    name: "RTCStatsWrapper"
  },
  plugins: [
    resolve({ preferBuiltins: true, mainFields: ["browser"] }),
    commonjs(),
    builtins()
  ]
};

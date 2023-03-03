import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
export default {
    input: "./src/index.js", // 入口
    output: {
        file: "./dist/vue.js", // 出口
        name: "Vue", //global.Vue（global上添加一个属性，叫Vue）
        format: "umd", //打包格式,umd统一模块规范,给全局上挂着一个vue的变量
        sourcemap: true, //希望可以调试源码
    },
    plugins: [
        babel({
            exclude: "node_modules/**",
        }),
        resolve()
    ],
};

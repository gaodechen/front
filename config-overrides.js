const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const antdOverride = override(
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: 'css'
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#1DA57A" }
    })
);

module.exports = function override(config, env) {
    config = antdOverride(config);
    return config;
}
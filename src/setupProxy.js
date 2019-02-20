const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy("/api", {
            pathRewrite: { '^/api': '' },
            target: "http://127.0.0.1:3000/",
            changeOrigin: true
        })
    );
};
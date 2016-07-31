const createConfig = require("../webpack.common.config");

module.exports = createConfig({
    output: {
        filename: "content.js"
    }
});
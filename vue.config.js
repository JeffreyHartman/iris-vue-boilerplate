const { defineConfig } = require("@vue/cli-service");
const fs = require("fs");
const path = require("path");

// The name of the compiled .js and .css files. Examples:
// @Html.ScriptWithCacheExpiration("~/Areas/ECUDispute/Scripts/HelloIris.js")
// <link rel="stylesheet" type="text/css" href="~/Areas/ECUDispute/Styles/ECUDispute.css" />
const fileName = "HelloIris";
// The areaName defined in the AlkamiManifest.xml file. This will probably match the filename
const areaName = "HelloIris";

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        optimization: {
            minimize: true,
            splitChunks: false,
        },
        output: {
            filename: `${fileName}.js`,
        },
        devtool: "eval-source-map",
        plugins: [
            {
                apply: (compiler) => {
                    compiler.hooks.afterEmit.tap(
                        "AfterEmitPlugin",
                        (compilation) => {
                            copyCompiledFile();
                            copyToOrbFolder();
                        }
                    );
                },
            },
        ],
        externals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            "@alkami/iris-vue": 'globalThis["iris-vue"]',
        },
    },
    css: {
        extract: {
            filename: `${fileName}.css`,
        },
    },
});

// Copy the compiled files into the Scripts and Styles folder of the parent MVC application
function copyCompiledFile() {
    let sourcePath = path.resolve(__dirname, `dist/${fileName}.js`);
    let destinationPath = path.resolve(__dirname, `../${fileName}.js`);

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
    }

    sourcePath = path.resolve(__dirname, `dist/${fileName}.css`);
    destinationPath = path.resolve(__dirname, `../../Styles/${fileName}.css`);

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
    }
}

// Copies the compiled files into the Orb folder for the project so they can be used without a rebuild of the MVC application
function copyToOrbFolder() {
    let sourcePath = path.resolve(__dirname, `dist/${fileName}.js`);
    let destinationPath = path.resolve(
        `C:\\Orb\\WebClient\\Areas\\${areaName}\\Scripts\\${fileName}.js`
    );

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
    }

    sourcePath = path.resolve(__dirname, `dist/${fileName}.css`);
    destinationPath = path.resolve(
        `C:\\Orb\\WebClient\\Areas\\${areaName}\\Styles\\${fileName}.css`
    );

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destinationPath);
    }
}

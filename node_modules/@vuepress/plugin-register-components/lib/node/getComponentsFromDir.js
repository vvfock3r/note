"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentsFromDir = void 0;
const utils_1 = require("@vuepress/utils");
const getComponentsFromDir = async ({ componentsDir, componentsPatterns, getComponentName, }) => {
    if (!componentsDir) {
        return {};
    }
    // get all matched component files
    const componentsDirFiles = await (0, utils_1.globby)(componentsPatterns, {
        cwd: componentsDir,
    });
    // transform files to name => filepath map
    return Object.fromEntries(componentsDirFiles.map((filename) => [
        getComponentName(filename),
        utils_1.path.resolve(componentsDir, filename),
    ]));
};
exports.getComponentsFromDir = getComponentsFromDir;

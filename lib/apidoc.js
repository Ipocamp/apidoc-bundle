const fs = require('fs');
const apidoc = require('apidoc');

module.exports = (outputDir, inputDir, conf) => {
    return function () {
        // prepare current project apidoc configuration file
        let configurationContent = JSON.stringify(conf, undefined, 2);
        let tmpConfPath = `${__dirname}/../cache`;

        fs.writeFileSync(`${tmpConfPath}/apidoc.json`, configurationContent);

        if (apidoc.createDoc({
            parsers: {
                apirole: `${__dirname}/../filters/api-roles.js`,
                apirequirement: `${__dirname}/../filters/api-requirement.js`
            },
            template: `${__dirname}/../template/`,
            config: tmpConfPath,
            excludeFilters: `node_modules/`,
            src: `${inputDir}/`,
            dest: `${outputDir}/`
        }) === false) {
            process.exit(1);
        }
    };
};

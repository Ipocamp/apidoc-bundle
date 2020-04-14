const fs = require('fs');
const crypto = require('crypto');
const apidoc = require('apidoc');

module.exports = (outputDir, inputDir, conf) => {
  return function () {
    // prepare current project apidoc configuration file
    let configurationContent = JSON.stringify(conf, undefined, 2);
    const hmac = crypto.createHmac('sha256', 'apidoc.json');
    hmac.update(configurationContent);
    let tmpConfPath = `${__dirname}/../cache/apidoc-${hmac.digest('hex')}.json`

    if(! fs.existsSync(tmpConfPath)){
      fs.writeFileSync(tmpConfPath, configurationContent);
    }

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
    }) === false){
      process.exit(1);
    }
  };
};

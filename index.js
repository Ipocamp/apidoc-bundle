const modelsDoc = require('./lib/modelsdoc');
const apiDoc = require('./lib/apidoc');

module.exports = function (outputDir, inputDir, conf) {
  if (conf.jsdoc){
    return modelsDoc(outputDir, inputDir);
  } else {
    return apiDoc(outputDir, inputDir, conf);
  }
};

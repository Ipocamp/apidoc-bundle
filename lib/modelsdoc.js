const COFFEE_RE = /^.*\.coffee$/;
const utils = require('./utils');

module.exports = (outputDir, inputDir) => {
  return function () {
    const done = this.async();
    console.warn(process.cwd())
    utils.findFilesOfType(
      process.cwd() + '/' + inputDir,
      COFFEE_RE
    ).then(
      (coffeeFiles) => {
        utils.execute(
          process.cwd()+'/node_modules/.bin/coffee',
          Array.prototype.concat(['--bare', '-c', '-o', '.transpiled/'], coffeeFiles),
          {
            cwd: process.cwd() + '/' + inputDir,
            env: process.env
          }
        ).then(
          () => utils.execute(
            process.cwd()+'/node_modules/.bin/jsdoc',
            ['--pedantic', '--verbose', '-d', outputDir, '-r', inputDir+'/.transpiled'],
            {
              cwd: process.cwd(),
              env: process.env
            }
          ),
          (coffeeCompilationError) => done(coffeeCompilationError)
        ).then(
          () => done(),
          (jsDocExtractionError) => done(jsDocExtractionError)
        );
      },
      (findError) => done(findError)
    );
  };
};

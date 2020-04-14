const { spawn } = require('child_process');
const walk = require('walk');

module.exports = {
  execute: (command, switches, env) => new Promise(function(resolve, reject) {
    let capture = '';
    let captureFetcher = spawn(command, switches, env);
    let captureFetchError = '';

    captureFetcher.stdout.on('data', (data) => {
      capture += data.toString('utf8');
    });

    captureFetcher.stderr.on('data', (data) => {
      captureFetchError += data.toString('utf8');
    });

    captureFetcher.on('close', (code) => {
      if (code !== 0) {
        return reject({code: 1, message: 'commmand execution failed', context: {command, switches, env}});
      }
      if (captureFetchError !== '') {
        return reject({code: 2, message: captureFetchError, context: {command, switches, env}});
      }
      resolve(capture);
    })
  }),
  findFilesOfType: function (searchDir, fileNameMatcher) {
    return new Promise((resolve, reject) => {
      let walker = walk.walk(searchDir);
      let filteredFiles = [];
      walker.on('file', (root, fileStats, next) => {
        if (fileNameMatcher.test(fileStats.name)) {
          filteredFiles.push(fileStats.name);
        }
        next();
      });
      walker.on('end', () => {
        resolve(filteredFiles);
      });
    });
  }
};

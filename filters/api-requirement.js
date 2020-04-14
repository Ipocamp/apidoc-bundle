/**
 * @param {string} input the string with normal double quotes
 * @return {string} string with the quotes replaced
 */
function codeReplace (txt) {
  var idx = 0;
  var q = ["<code>", "</code>"];
  return txt.replace(/`/g, function () {
    var ret = q[idx];
    idx = 1 - idx;
    return ret;
  });
}

function parse (content) {
  let name = codeReplace(content);
  if (name.length === 0) return null;
  return { name: name };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: "local.requirement",
  method: "push",
  preventGlobal: true
};

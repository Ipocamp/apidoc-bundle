function parse (content) {
  let name = content;
  if (name.length === 0) return null;
  return { name: name };
}

/**
 * Exports
 */
module.exports = {
  parse: parse,
  path: "local.role",
  method: "push",
  preventGlobal: true
};

// transform.js
const j = require('jscodeshift')

function transform (file, api, options) {
  console.log('transforming', file.path)

  const parsed = j(file.source)
  const transformed = parsed

  const outputOptions = {
    quote: 'single'
  }

  parsed.find(j.FunctionDeclaration)
    .forEach(function (path) {
      console.log("--> ", path.node.id.name)
    })
    .replaceWith(function(path) {
      const { node } = path;

      // change function declaration name
      node.id.name = node.id.name.repeat(3);

      return node
    })

  return transformed.toSource(outputOptions)
}

module.exports = transform

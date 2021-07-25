// codemod

const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const update = (p) =>
    j(p).replaceWith(
      j.objectExpression(
        deepFlatten(
          p.value.arguments.map((arg) =>
            arg.type === "ObjectExpression"
              ? arg.properties
              : j.spreadProperty(arg)
          )
        )
      )
    );

  // pattern matching
  root.find(j.CallExpression, { callee: { name: "merge" } }).forEach(update);

  return root.toSource();
};

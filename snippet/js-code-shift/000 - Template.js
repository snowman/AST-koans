export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  return root
    .find(j.CallExpression, {})
    .replaceWith((nodePath) => {
      const { node } = nodePath;

      return node;
    })
    .toSource({ quote: "single", trailingComma: true });
};

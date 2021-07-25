export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  return root
    // .find(j.VariableDeclarator, {id: {name: "foo"}})
    .findVariableDeclarators('foo')
    .renameTo("bar")
    .toSource({ quote: "single", trailingComma: true });
};

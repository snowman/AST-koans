// transform deprecated.input.js

//deprecated.js
export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // find declaration for "geometry" import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: "Literal",
      value: "geometry",
    },
  });

  // get the local name for the imported module, localName may be different for different js files
  const localName =
    // find the Identifiers
    // get the Node in the NodePath and grab its "name"
    importDeclaration
      .find(j.Identifier)
      // get the first NodePath from the Collection
      .get(0).node.name;

  return root
    .find(j.MemberExpression, {
      object: {
        name: localName,
      },
      property: {
        name: "circleArea",
      },
    })
    .replaceWith((nodePath) => {
      // get the underlying Node
      const { node } = nodePath;
      // change to our new prop
      node.property.name = "getCircleArea";
      // replaceWith should return a Node, not a NodePath
      return node;
    })
    .toSource();
};

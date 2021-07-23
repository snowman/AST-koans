// sample.js
function square(num) {
  return num * num;
}

console.log("global num is " + window.num);

// transform.js
module.exports = () => {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name !== "num") {
          return;
        }
        if (path.parent.type !== "FunctionDeclaration") {
          return;
        }
        if (path.parent.id.name !== "square") {
          return;
        }

        const referencePaths = path.scope.bindings["num"].referencePaths;
        referencePaths.forEach((path) => (path.node.name = "n"));

        path.node.name = "n";
      },
    },
  };
};

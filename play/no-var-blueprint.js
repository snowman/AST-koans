function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const updatedAnything =
    root
      .find(j.VariableDeclaration)
      .filter((dec) => dec.value.kind === "var")
      .filter((declaration) => {
        return declaration.value.declarations.every((declarator) => {
          return !isTruelyVar(declaration, declarator);
        });
      })
      .forEach((declaration) => {
        const forLoopWithoutInit = isForLoopDeclarationWithoutInit(declaration);

        if (
          declaration.value.declarations.some((declarator) => {
            return (
              (!declarator.init && !forLoopWithoutInit) ||
              isMutated(declaration, declarator)
            );
          })
        ) {
          declaration.value.kind = "let";
        } else {
          declaration.value.kind = "const";
        }
      })
      .size() !== 0;

  return updatedAnything ? root.toSource() : null;
}

module.exports = transform;

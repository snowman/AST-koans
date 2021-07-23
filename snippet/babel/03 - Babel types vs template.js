// @babel/template
// @bable/types 可以创建 ast 节点, 但过于繁琐,
// 通过 @babel/template 则可以快速创建整段的 ast 节点.
//
// 下面 对比 获得 import React from 'react' ast 节点 的 两种 方式:

// @babel/types
const types = require("@babel/types");
const ast = types.importDeclaration(
  [types.importDefaultSpecifier(types.identifier("React"))],
  types.stringLiteral("react")
);
path.replaceWith(ast);

// @babel/template
const template = require("@babel/template").default;
const ast = template.ast(`import React from 'react'`);
path.replaceWith(ast);

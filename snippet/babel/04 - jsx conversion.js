const { declare } = require("@babel/helper-plugin-utils");
const jsx = require("@babel/plugin-syntax-jsx").default;
const core = require("@babel/core");
const t = core.types;

/*
  遍历 JSX 标签, 约定 node 为 JSXElement, 如
  node = <view onTap={e => console.log('clicked')} visible>ABC<button>login</button></view>
*/

const handleJSXElement = (node) => {
  const tag = node.openingElement;
  const type = tag.name.name;
  const propertyes = [];

  propertyes.push(
    t.objectProperty(t.identifier("type"), t.stringLiteral(type))
  );

  const attributes = tag.attributes || [];

  attributes.forEach((jsxAttr) => {
    switch (jsxAttr.type) {
      case "JSXAttribute": {
        const key = t.identifier(jsxAttr.name.name); // 得到 属性 onTap / visible

        const convertAttributeValue = (node) => {
          if (t.isJSXExpressionContainer(node)) {
            // 属性值 为 表达式 (如 函数)
            return node.expression; // 返回 表达式
          }

          // 空值 转化 为 true, 如将 <view visible /> 转化为 { type: 'view', visible: true }
          if (node === null) {
            return t.booleanLiteral(true);
          }

          return node;
        };

        const value = convertAttributeValue(jsxAttr.value);

        propertyes.push(
          // 获得 { type: 'view', onTap: e => console.log('clicked'), visible: true }
          t.objectProperty(key, value)
        );

        break;
      }
    }
  });

  const children = node.children.map((e) => {
    switch (e.type) {
      case "JSXElement": {
        return handleJSXElement(e);
      }

      case "JSXText": {
        return t.stringLiteral(e.value);
      }
    }

    return e;
  });

  propertyes.push(
    t.objectProperty(t.identifier("children"), t.arrayExpression(children))
  );

  const objectNode = t.objectExpression(propertyes);

  /* results:
  {
    "type": "view",
    "visible": true,
    "children": [
      "ABC",
      {
        "type": "button",
        "children": [
          "login"
        ]
      }
    ]
  }
  */

  return objectNode;
};

module.exports = declare((api, options) => {
  return {
    inherits: jsx,

    visitor: {
      JSXElement(path) {
        // 遍历 JSX 标签, 如: <view />
        // 将 JSX 标签转化为 Object
        path.replaceWith(handleJSXElement(path.node));
      },
    },
  };
});

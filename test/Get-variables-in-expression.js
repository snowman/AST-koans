const $ = require("gogocode");

$(`(a.b.c && b) || (c && d)`)
  .find("$_$")
  .each((item) => {
    if (
      item.parent( ).node.type == "MemberExpression"
   && item.parent(1).node.type != "MemberExpression"
    ) {
      // M-x flush-lines RETurn
      //   start: \| end: \| undefined,?$\| null,?$\| indent: \| optional:\| computed:
      //
      // Remove all trailing comma,

// // item.parent(1).node
// Node {
//   type: 'LogicalExpression'
//   left: Node {
//     type: 'MemberExpression'
//     object: Node {
//       type: 'MemberExpression'
//       object: [Node]
//       property: [Node]
//     }
//     property: Node {
//       type: 'Identifier'
//       name: 'c'
//     }
//   }
//   operator: '&&'
//   right: Node {
//     type: 'Identifier'
//     name: 'b'
//   }
// }

// // item.node
// Node {
//   type: 'Identifier'
//   name: 'c'
// }

// // item.parent().node
// Node {
//   type: 'MemberExpression'
//   object: Node {
//     type: 'MemberExpression'
//     object: Node {
//       type: 'Identifier'
//       name: 'a'
//     }
//     property: Node {
//       type: 'Identifier'
//       name: 'b'
//     }
//   }
//   property: Node {
//     type: 'Identifier'
//     name: 'c'
//   }
// }
      // 输出 a.b.c 整体 而不是 a \ b \ c
      console.log("1: ", item.parent().generate());
    } else if (item.parent().node.type != "MemberExpression") {
      // 输出独立的变量
      console.log("2: ", item.generate());
    }
  });

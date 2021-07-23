// https://glebbahmutov.com/blog/jscodeshift-example/

// client.js
const add = require("./calc");

// transform.js
const isRequire = (node) =>
  node && node.callee && node.callee.name === "require";
const isUnary = (args) => Array.isArray(args) && args.length === 1;
const isCalc = (arg) => arg.value === "./calc";

const isRequireCalc = (node) =>
  isRequire(node) && isUnary(node.arguments) && isCalc(node.arguments[0]);

function transform(file, api, options) {
  const parsed = j(file.source);

  parsed
    .find(j.CallExpression)
    .filter((path) => isRequireCalc(path.value))
    .forEach(function (path) {
      console.log(path.value);
    });

  parsed
    .find(j.CallExpression, { callee: { value: "require" } })
    .replaceWith(function (path) {
      return j.memberExpression(path.value, j.identifier("add"));
    });
}

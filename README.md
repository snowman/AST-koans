# Idea
## How to given two file, generate the AST convert code automatically?
## REPL for AST code power with TDD
1. write expected first, then write AST
2. run test until match expectation
# Playground !
1. [AST explorer](https://astexplorer.net/)
   You can toggle the visibility of properties in AST Explorer with the
   checkboxes above the tree.
2. [GoGoCode PlayGround](https://play.gogocode.io/)
# Existing codemods
1. [js-codemod no-vars](https://github.com/cpojer/js-codemod/#no-vars)
   Convert all instances of "var" into either "let" or "const", based on the variable usage.

   For example, "let" if the variable is reassigned at a later time and
   "const" when the variable is never reassigned.
2. [js-codemod template-literals](https://github.com/cpojer/js-codemod/#template-literals)
   Replace instances of string concatenation with template literals e.g.

   const sayHello = 'Hi my name is ' + name;
   // after transform
   const sayHello = `Hi my name is ${name}`;
3. [Codemod scripts to transform code to next generation JS](https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js)
# some helper to help
1. [A utility to help you explore jscodeshift](https://github.com/reergymerej/jscodeshift-helper#readme)

# Example test data
```js
var foo
foo = "foo"

var bar
bar = {foo: "foobar"}

var g
g = /abc/g
```
# Business
## Rename one variable in real time to auto rename all references
[Esprima: Rename Refactoring](https://esprima.org/demo/rename.html)

Improvements:
1. Editor size should be full screen.
2. Edit too quickly would fail to rename references.
3. Edit after variable name does NOT take effect.
4. Auto generate unique variable name.

Determineal:
0. Make sure there are not occurrens of "_fn_" and "_anon_" in source code.
2. There are not duplicate function name.
1. Prefix function with fn_
2. Anoymonus function parameter f?_anX (? is the tail of function name like fn_?, X is the uniq number)
3. Variable name prefix by function abbreviation,
   if variable "a" inside function "fn_l" then renamed to "fl_a"
   if variable "b" inside annoymous function then renamed to "f?_anX_b"

Why not use auto-rename tools?
  function a() {var foo = "foo"}
  function b() {var foo = "bar"}

Generate the uniq function name and variable name: (seems like de-uglify)
  function a1cb13() {var _faxcb = "foo"}
  function fasdfz() {var abc2_3 = "bar"}
## You should write an AST diff tool
1. So that when you rename variable, you are confident what you change and would not omit some replacements.

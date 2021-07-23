# Idea
## How to given two file, generate the AST convert code automatically?
## REPL for AST code power with TDD
1. write expected first, then write AST
2. run test until match expectation
# Playground !
1. [AST explorer](https://astexplorer.net/)
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

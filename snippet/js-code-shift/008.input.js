// Requirement:
//   1. only change variable "foo" to "bar"
//   2. change function param "foo" to "bar"

var foo;
foo = "foo";

var foobar;
foobar = {foo: "foobar"};

function bar(foo, foobar) {
  foobar = {foo: "foobar"};
}

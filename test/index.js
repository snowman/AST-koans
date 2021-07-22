const $ = require("gogocode");

const path = require("path");

const AST = $.loadFile(path.join(__dirname, "sample.js"));

AST.find("$_$").each((item) => {
  // console.log(item.match[0]);
});

const res = $(`const fetch = () => {}; const noChange = fetch`)
  .find("fetch")
  .each((item) => {
    item.attr("name", "request");
  })
  .root()
  .generate();

// console.log(res)

// 获取 所有 字符串
$.loadFile(path.join(__dirname, "string.js"))
  .find(`'$_$'`)
  .each((item) => {
    //    console.log(item.match);
  });

$.loadFile(path.join(__dirname, "string.js"))
  .find(`'getList'`)
  .each((item) => {
    // console.log(item.node)
  });

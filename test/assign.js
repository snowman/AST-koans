const fs = require("fs");
const $ = require("gogocode");
const code = fs.readFileSync("assign.sample.js").toString();

// 赋值(Assignment)与定义(Declaration)语句需要区分开
// 获取所有赋值语句
$(code)
  .find(`$_$1 = $_$2`)
  .each((item) => {
    console.log(item.match[1]);
    console.log(item.match[2]);
  });

// 获取对 list 的赋值语句
$(code)
  .find("list = $_$")
  .each((item) => {
    console.log(item.match[0]);
  });

// 获取对 car 对象中的 color 属性的赋值语句
$(code).find("car.color = $_$");

// 获取对任意对象中的 color 属性的赋值语句
$(code).find("$_$1.color = $_$2");

// 获取被[1, 2]赋值的变量名
$(code).find("$_$ = [1, 2]");

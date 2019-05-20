'use strict';
var recast = require("recast");//解析ast
// var fs = require('fs')
var types = require("ast-types");
// var dataCode = fs.readFileSync('./test.js', 'utf8');
var jscodeshift = require('jscodeshift')//操作ast工具包
// console.log(jscodeshift,33);

// const {variableDeclaration, callExpression,objectExpression ,variableDeclarator, functionExpression} = recast.types.builders;

// console.log(recast.types.builders);
function consoleLoader ( source) {
  // var ast = recast.parse(source, {
  //   parser: require("acorn")
  // });
  const root = jscodeshift(source);
  return root.find(jscodeshift.CallExpression,{
    callee:{
        type:'MemberExpression',
        object:{
            type:'Identifier',
            name:'console'
        },
        property:{
          type:'Identifier',
          name:'log'
        }
    }
}).remove().toSource();
  // callExpressions.remove();
  // console.log(root.toSource());
  // return callExpressions;

  // types.visit(ast, { //用来遍历ast树
  //   visitCallExpression: function(path) {
  //       // console.log(path, 55555);
  //       return false;
  //     },
  //     // visitMemberExpression: function(path){
  //     //     console.log(path.node,4444);
  //     //     return false;
  //     // }
  //   })
  
  // return recast.print(ast).code;
}

module.exports = function (content) {
  return consoleLoader(content);
}
// console.log(consoleLoader(dataCode));
// fs.writeFile('./result.js', consoleLoader(dataCode),function(err) {
//   if (err) {
//       throw err;
//   }
// }
// )
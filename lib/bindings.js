'use strict';
const path = require('path');
const ref = require('ref-napi');
const assert = require('assert');
const fs = require("fs");

let currentPath = __dirname;
if(currentPath.indexOf(path.sep + 'app.asar' + path.sep) > -1)
{
  let subPath = currentPath.substring(currentPath.indexOf("app.asar")+8);
  let currentPathPre = currentPath.substring(0,currentPath.indexOf("app.asar"));
  let currentPathFull = path.join(currentPathPre,'app.asar.unpacked',subPath,'..');
  if (fs.existsSync(currentPathFull)) {
    currentPath = currentPathFull;
  }else{
    console.warn('may be use asar package,but no use asarUnpack for ref-napi,check path:'+currentPath);
    currentPath = path.join(currentPath, '..');
  }
}else{
  currentPath = path.join(currentPath, '..');
}
console.warn('load module from:'+currentPath);

assert(ref.instance);

const bindings = require('node-gyp-build')(currentPath);
module.exports = bindings.initializeBindings(ref.instance);

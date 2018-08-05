const path = require('path');
const fs = require('fs');

//TODO:遍历文件名
var walk = function (paths,callback) {
    let fileArr= [];
    fs.readdirSync(paths).forEach(function (file) {
        let stats = fs.statSync(path.join(paths,file))
        if(stats.isFile()){
            fileArr.push(file)
        }
    });
    callback(fileArr)
}
//TODO:遍历文件夹名
var walkDir = function (paths,callback) {
    let dirArr= [];
    fs.readdirSync(paths).forEach(function (file) {
        let stats = fs.statSync(path.join(paths,file));
        if(stats.isDirectory()){
            dirArr.push(file)
        }
    })
    callback(dirArr)
}

var mkDir = function (paths,callback) {
    fs.mkdir(paths,(err)=>{
        if(err){
            console.log(err);
            return
        }
        callback(null,'successful create')
    })
};

exports.walk = walk;
exports.walkDir = walkDir;
exports.mkDir = mkDir
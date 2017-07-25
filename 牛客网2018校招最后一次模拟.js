//这次的编程题，个人感觉比较简单。我做的全是字符串类型的型。

//第一题：DNA片段
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
rl.on('line', function(line){ // javascript每行数据的回调接口
    var stringDNA = line;
    var length = stringDNA.length;
    var char;var temp = 0;
    var max = 0;
    for(var i =0 ;i< length ; i++){
        char = stringDNA[i];
        if(char == "A" || char == "T" || char == "C" || char == "G"){
            temp++;
        }else{
            max = max>temp?max:temp;
            temp = 0;
        }
    }
    max = max>temp?max:temp;
    console.log(max);
});

//第二题：最长偶串
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});
var x = 0, a = str[0];
x = str.indexOf(a);
// 两段字符串是否相等
if(x > str.length/2){
    return 1;
}
var i = 0,indexs = [];
while(i<str.length/2 && i > -1){
    indexs.push(i);
    i = str.indexOf(a,i+1);
}
// console.log(indexs); //
if(indexs.length < 1){return 1;};
for(var i = indexs.length - 1 ; i>0; i--){
    // console.log(str.substr(indexs[i],indexs[i]));//
    // console.log(str.substr(0,indexs[i]));//
    if(str.substr(indexs[i],indexs[i]) == str.substr(0,indexs[i])){
        // console.log("i:",indexs[i]);//
        return indexs[i]*2;
    }
}
return 1;// return n;
}

//第三题：最少回文串
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

rl.on('line', function(line){ // javascript每行数据的回调接口
    console.log(findMax(line));
});
function findMax(str){
    var sum = {};

    for(var i =0;i<str.length ; i++){
        sum[str[i]] = sum[str[i]] ? sum[str[i]]+1 : 1;
    }

    // pingjie
    var duoyu = 0;
    for(var key in sum){
        // console.log(key,sum[key]);
        if(sum[key]%2){
            duoyu ++;
        }
    }
    return duoyu;
}
 [LeetCode-008](https://leetcode.com/problems/string-to-integer-atoi/description/)
 <br>
 思路：意外终结求解过程，计算求解结果
 
 ```javascript
 /**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    var numString = false;
    var first = false;
    var pre = 0;
    var sign = 0;
    var result = 0;
    for(var i in str){
        if('0'<=str[i] && str[i]<='9') {
            if(!first) first = true;
            else if(pre != i - 1) 
                // return result*(sign>-1?1:-1) > 2147483647?2147483647:result*(sign>-1?1:-1);
                break;
            result = result * 10 + (str[i] - '0');
            pre = i;
        } else if(str[i] === '+' || str[i] === '-'){
            if(sign) return 0;
            else sign = str[i] === '+' ? 1 : -1;
            pre = i;
            first = true;
        }else if(str[i] !==' ') {
            break;
        }
        //console.log(result)
    }
    return ((result - 2147483647 > 0 ? (2147483647 + ((sign>-1)?0:1)) : result) )*(sign>-1?1:-1);
};
```

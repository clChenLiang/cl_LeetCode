*
 * @param {number[]} nums
 * @return {boolean}
 */
// var canPartition = function(nums) {
//     var sum = 0;
//     var result = [];
//     for(var i=0 ;i<nums.length ;i++){
//         sum+=nums[i];
//     }
//     if(sum % 2){return false}
//     // find the x nums ,that sum of them 
//     var _sum = sum/2;
//     result[0] = [];
//     // init the first row of nums
//     for(var j=0 ;j<=_sum ;j++){
//         if(j<nums[0]){
//             result[0][j] = false;
//         }else{
//             result[0][j] = true;
//         }
//         // console.log(result[0][j]);
//     }
//     // aculate the results of matrix
//     for(var i=1 ;i<nums.length ;i++){
//         result[i] = [];
//         for(var j=0 ;j<=_sum ;j++){
//              result[i][j] = (result[i-1][j-nums[i]] || result[i-1][j])?true:false;
//              // console.log("i:",i,"j:",j,result[i][j]);
//         }
//         var chars = "";// 每行结果
//         for(var k in result[i]){
//             chars+=" "+result[i][k];
//         }
//         console.log(chars);
//     }
//     return result[nums.length -1 ][_sum ];
// };
// console.log(canPartition([1, 5,11, 5]));
// 测试案例：
//  [1,2,5] -- false
//  [1, 5,11, 5] -- true 
//  [100] -- false
/*改版其它语言*/
function canPartition(nums){
    var sum = 0;
    var result = [];
    if(!nums || nums.length<2){return false;}
    nums.map(function(a){sum+=a});
    console.log(sum);
    if(sum%2){return false;}
    sum /= 2;

    result[0] = true;
    // for(var i =0; i<= nums.length-1; i++){
    //     for(var j=sum;j>0;j--){
    //         // result[j] = (result[j] || result[j-nums[i-1]])?true:false;
    //         // console.log( (result[j] || result[j-nums[i-1]])?true:false );
    //         // console.log(result[j]);
    //         if(j>=nums[i]){
    //             result[j] = (result[j]||result[j-nums[i]])?true:false;
    //             console.log(result[j]);
    //         }
    //     }
    // }
    // console.log(result[sum]);
    // return result[sum];
    for(var i=1; i<=nums.length; i++){
        for(var j=sum; j>=nums[i-1];j--){
            result[j] = (result[j] || result[j-nums[i-1]])?true:false;
        }
        console.log(result.map(function(a){return a?" true":"false"}).toString());
    }
    // console.log("result 3",result[3]?true:false);
    // console.log(result.toString());
    return result[sum];
}
console.log(canPartition([100]));

/*354. Russian Doll Envelopes*/
/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    if( !envelopes || !envelopes.length ){
        return 0;
    }
    
    var dp = new Array(envelopes.length).fill(1);
    // 宽排序
    envelopes.sort((a,b)=>(a[0] - b[0]));
    console.log(envelopes);
    var ret = 0;
    for(var i = 0; i < envelopes.length; i++){
        for( var j = 0; j < i; j++){
            if( envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]){
                dp[i] = dp[i] > dp[j] + 1 ? dp[i] : dp[j] + 1;
                // console.log(i,"dp[i]: ",dp[i]);
            }
        }
        ret = ret > dp[i] ? ret : dp[i];
        // console.log("ret: ",ret);
    }
    return ret;
};
maxEnvelopes([[5,4],[6,4],[6,7],[2,3]]);
/*↑↑↑测试数据↑↑↑*/
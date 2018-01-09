/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    var results = [];
    // put into three
    var positiveArrays = [];
    var negativeArrays = [];
    var zeroArrays = [];
    nums.map((n)=>{
        if(n>0) positiveArrays.push(n);
        else if(n<0) negativeArrays.push(n);
        else zeroArrays.push(n);
    });
    if(zeroArrays.length){
        for(var i in negativeArrays) {
            if (positiveArrays.indexOf(-negativeArrays[i])>-1)
                results.push([negativeArrays[i],0,-negativeArrays[i]]);
        }
    }
    for(var i in positiveArrays){
        for(var j in negativeArrays){
            var sumOf2 = positiveArrays[i] + negativeArrays[j];
            if(sumOf2 > 0) {
                var temp = negativeArrays[j];
                negativeArrays[j] = 0;
                if(negativeArrays.indexOf(-sumOf2)>=0)
                    if(results.indexOf([positiveArrays[i],temp,sumOf2])<0) results.push([positiveArrays[i],temp,sumOf2].sort((a,b)=>{return a-b}));
                negativeArrays[j] = temp;
            }
            else if (sumOf2 < 0) {
                var temp = positiveArrays[i];
                positiveArrays[i]= 0;
                if(negativeArrays.indexOf(-sumOf2)>=0)
                    if(results.indexOf([temp,negativeArrays[j],sumOf2])<0) results.push([temp,negativeArrays[j],sumOf2].sort((a,b)=>{return a-b}));
                positiveArrays[i] = temp;
            }
            console.log(results,sumOf2 ,positiveArrays[i] , negativeArrays[j]);
        }
    }
    console.log(results);
    return results;
};



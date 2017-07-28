/*项目需求： 
    在每位玩家初始化的时候，拥有十三张牌。分别为同一幅扑克牌中去掉大小王，随机获取的。需要将十三张牌中所隐含的所有的牌型全部找出，以便进行快速匹配。 
游戏规则： 
    每个人需将手中的十三张牌分成头墩、中墩以及尾墩三堆牌，分别为三张、五张、五张。要求后面的墩牌比前面的墩牌大。 
牌型大小： 
    首先，按牌面数字大小排序。2，3，4，，，A。其次，比较花色。黑 > 红 > 梅 > 方。牌型共有：乌龙，对子，三条，两对，葫芦，炸弹，同花，顺子，同花顺，共九种。大小依次递增。 
扑克牌的实现方式: 
    从“方片2，梅花2，红桃2，黑桃2，方片3，，，，黑桃A”分别赋值为 ： 0，1，2，3，，，51
*/
// 见于个人博客：http://blog.csdn.net/cchenliang/article/details/76283803

// 测试案例，生成13张随机的牌
var test = function(){
	var cards = [];
	for(var i= 0 ;i<13;i++){
		var _temp = Math.floor( Math.random()*52);
		cards.indexOf(_temp)<0?cards.push( _temp ):i--;
	}
	console.log(cards);
	return cards;
}

// 返回对子
var getDuizi = function(cards){
	// @params: cards 为后台发回来的牌组
	// 长度判断，暂不做
	var result = [];
	var numbers = classifyCard(cards).numbers;
	// 得到对子
	numbers.forEach(function(data ,i){
		if( data.length == 2 ){
		// 表明有对子
		result.push( [ data[0]+4*i ,data[1]+4*i ] );
		}
		if( data.length == 3 ){
			result.push(
				[ data[0]+4*i ,data[2]+4*i ],
				[ data[0]+4*i ,data[1]+4*i ],
				[ data[1]+4*i ,data[2]+4*i ]
				);
		}
		if( data.length == 4 ){
			result.push(
				[ data[0]+4*i ,data[1]+4*i ],
				[ data[0]+4*i ,data[2]+4*i ],
				[ data[0]+4*i ,data[3]+4*i ],
				[ data[1]+4*i ,data[2]+4*i ],
				[ data[1]+4*i ,data[3]+4*i ],
				[ data[2]+4*i ,data[3]+4*i ]
				);
		}});
	return result;
}

// 返回三条
var getSantiao = function(cards){
	var result = [];
	var numbers = classifyCard(cards).numbers;
	numbers.forEach(function(data,i){
	if( data.length == 3 ){
		result.push( [ data[0]+4*i ,data[1]+4*i ,data[2]+4*i] );
	}
	if( data.length == 4){
		result.push(
			[ data[0]+4*i ,data[1]+4*i ,data[2]+4*i],
			[ data[3]+4*i ,data[1]+4*i ,data[2]+4*i],
			[ data[0]+4*i ,data[1]+4*i ,data[3]+4*i],
			[ data[0]+4*i ,data[2]+4*i ,data[3]+4*i])
		}
	})

	return result;
}
// 返回顺子
var getShunzi = function(cards){
	// [4, 45, 37, 46, 6, 7, 47, 30, 13, 0, 34, 41, 5] 顺子测试集
	var result = [];
	var numbers = classifyCard(cards).numbers;
	var _tempArr = [];// [[],[i ,len ]],i前的 len 个连在一起
	var len = 0;
	numbers = [numbers[12]].concat(numbers);//将A复制到前面来
	for(var i = 0;i<14;i++){
		if(numbers[i].length == 0){
			len > 4 ? _tempArr.push([i,len]):null;
			len = 0;
		}else{
			len++;
		}
		if( i==13 && len > 4 ){
			_tempArr.push([i,len]);
		}
	}
	// 第一层循环，所有连成片的
	for(var i = 0 ;i<_tempArr.length; i++){
		// 第二层，单个连片的;每次取出
		for(var j = 0;j<_tempArr[i][1]-4 ;j++){//每次取5个,j 表示分片起始位置
			var _aa = _tempArr[i][0] - _tempArr[i][1] + j;//记下 numbers 连续五组的起始点
			result.push(combination2([
				numbers[_aa].map(function(a,i){return ((_aa-1)?(_aa-1):12)*4+a}),
				numbers[_aa+1].map(function(a,i){return (_aa)*4+a}),
				numbers[_aa+2].map(function(a,i){return (_aa+1)*4+a}),
				numbers[_aa+3].map(function(a,i){return (_aa+2)*4+a}),
				numbers[_aa+4].map(function(a,i){return (_aa+3)*4+a})],5));
		}
	}
	return result;
}
// 返回同花
var getTonghua = function(cards){
	// [18, 29, 24, 46, 41, 45, 51, 32, 23, 11, 20, 31, 30] 无
	// [46, 44, 35, 18, 28, 2, 34, 31, 13, 48, 22, 32, 20] 有
	var result = [];
	var colors = classifyCard(cards).colors;
	colors.forEach(function(data,i){
		if(data.length > 4){
			// 还原成点数
			var _tempData = data.map(function(a){ return a*4+i ;});
			// 排列组合 data ,并 push 到结果 result 中
			result.push( combination(_tempData ,5) );
		}
	});
	console.log(result);
	return result;
}

// 返回葫芦
var getHulu = function(cards){
	// [39, 27, 30, 41, 47, 3, 31, 45, 13, 26, 29, 34, 21] 存在，且交叉
	var result = [];
	var sanTiao = this.getSantiao(cards);
	var duizi = this.getDuizi(cards);
	var _temp = [];
	// 如果三条和对子都存在
	if(sanTiao.length && duizi.length){
		_temp = combination2([sanTiao,duizi],2);
	}
	for(var i=0 ;i<_temp.length ;i++){
		if(_temp[i][0]%4 != _temp[i][4]%4){
			result.push(_temp[i]);
		}
	}
	return result;
}

// 返回炸弹
var getZhadan = function(cards){
	var result = [];
	var numbers = classifyCard(cards).numbers;
	numbers.forEach(function(data,i){
		if( data.length == 4){
			result.push([ data[0]+i*4 ,data[1]+i*4 ,data[2]+i*4 ,data[3]+i*4]);
		}
	})
	return result;
}

// 返回同花顺
var getTonghuashun = function(cards){
	// [46, 44, 35, 18, 33, 2, 34, 31, 13, 48, 22, 32, 20] 有
	// [18, 29, 24, 46, 41, 45, 51, 32, 23, 11, 20, 31, 30] 无
	var result = [];
	// 判断是否为顺子
	var isShunzi = function(arr){
	// 测试成功 isShunzi([1,2,3,4,18]); isShunzi([1,2,3,4,6])
	if(arr.length < 5){
		// 之前的BUG 出现在这里。运行时传入的参数为 [[31,32,33,34,35]]
		arr = arr[0];
	}
	console.log(arr);
	var flag = true;
	var _temp = [];
	for(var i = 0 ; i<arr.length ;i++){
		// _temp.push( arr[i] % 13 );
		_temp.push( Math.floor( arr[i] / 4) );
	}
	console.log("转换后的 arr ",_temp);
	_temp.sort(function(a,b){return a-b;})
		.forEach(function(a,b){ a == _temp[0]+b ? null : flag=false;});
	// 补充 A2345 这种特殊情况
	if(!flag){
		if(temp[0]==0 && temp[1]==1 && temp[2]==2 && temp[3]==12 ){
			flag = true;
		}
	}
		// if( (_temp[0]+1 == _temp[1]) &&(_temp[0]+2 == _temp[2]) &&(_temp[0]+3 == _temp[3]) &&(_temp[0]+4 == _temp[4]));顺子的判断方法一
		console.log('是否为顺子',flag);
		return flag;
	}


	var _tempResult = this.getTonghua(cards);
	for(var i = 0; i< _tempResult.length ;i++){
		var _aa = _tempResult[i];
		console.log("发现一个疑似同花顺",_tempResult[i]);

		// 此处有问题，需要再考虑仔细，运行不通，无法判断 -- 已解决，见 @line 175
		console.log('@line 191 ',isShunzi(_aa));
		if( isShunzi( _aa ) ){
			console.log("发现一个同花顺");
			result.push( _tempResult[i] );
		}
	}
	console.log("同花顺："+result);
	return result;
}

// 对牌进行分类
var classifyCard = function(cards){
	// 将牌进行排序分类
	// color 花色
	var colors = [
	// "黑":[],
	// "红":[],
	// "梅":[],
	// "方":[],
	// "0":[],"1":[],"2":[],"3":[]
	[],[],[],[]
	];
	// number 点数
	var numbers = [
	// "0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[],"8":[],"9":[],"10":[],"11":[],"12":[]
	// 0,1,2,3,4,5,6,7,8,9,10,11,12
	[],[],[],[],[],[],[],[],[],[],[],[],[]
	];
	// 将牌分类;
	cards.forEach(function(card){
		// 获取花色 : 0-13 为同一花色做法
		// var _color = Math.floor( card / 13 );
		// // 获取点数
		// var _num = (card % 13);
		// 0-4 为一个点数写法
		var _color = card % 4;
		var _num = Math.floor( card / 4 );
		colors[_color].push( _num );
		numbers[_num].push(_color);
	});

	// 还原成牌的大小; 0-13 为同一花色的写法
	// colors[i][j] : card = i*13 + j;
	// numbers[i][j] : card = j*13 + i;
	// 还原成牌的大小; 0-4 为同一点数的写法
	// colors[i][j] : card = j*4 + i;
	// numbers[i][j] : card = i*4 + j;
	console.log(colors);
	console.log(numbers);
	return {"colors":colors,"numbers":numbers};
}

// 排列组合
var combination = function(arr, num){
	var r=[];
	(function f(t,a,n){
		if (n==0)
		{
			return r.push(t);
		}
		for (var i=0,l=a.length; i<=l-n; i++)
		{
			f(t.concat(a[i]), a.slice(i+1), n-1);
		}
	})([],arr,num);
	return r;
}
// 畸形排列组合 --- 用于找顺子后的排列，包含同一点数不同花数
var combination2 = function(arr, num){
	var r=[];
	(function f(t,a,n)
	{
		if (n==0)
		{
			return r.push(t);
		}
		for (var i=0,l=a.length; i<=l-n; i++)
		{
			for(var j=0;j<a[i].length ;j++){
				f(t.concat(a[i][j]), a.slice(i+1), n-1);
			}
		}

	})([],arr,num);
	return r;
}
// 将牌排序 -- 舍弃
var sortCards = function(cards){
	var result = [];
	// 鸽巢法
	var allSort = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	// 每个位置 i 代表的牌数为 (51 - i)
	for(var i = 0 ;i<cards.length ;i++){
		allSort[51-cards[i]] = 1;
	}

	for(var i = 0 ;i<52 ;i++){
		if(allSort[i]){
			result.push( 51 - i );
		}
	}
	return result;
}
var http = require('http');

var netSite = [
	"http://blog.csdn.net/cChenLiang/article/details/75003399",
	"http://blog.csdn.net/cChenLiang/article/details/74959098",
	"http://blog.csdn.net/cChenLiang/article/details/74013278",
	"http://blog.csdn.net/cChenLiang/article/details/73351094","http://blog.csdn.net/cchenliang/article/details/53470236",
	"http://blog.csdn.net/cchenliang/article/details/73251804","http://blog.csdn.net/cchenliang/article/details/53525498",
	"http://blog.csdn.net/cchenliang/article/details/73060841","http://blog.csdn.net/cchenliang/article/details/72877051",
	"http://blog.csdn.net/cchenliang/article/details/72877051","http://blog.csdn.net/cChenLiang/article/details/75003399",
	"http://blog.csdn.net/cchenliang/article/details/72877199","http://blog.csdn.net/cchenliang/article/details/72877051",
	"http://blog.csdn.net/cchenliang/article/details/72829165","http://blog.csdn.net/cChenLiang/article/details/75003399",
	"http://blog.csdn.net/cchenliang/article/details/72812079",
	"http://blog.csdn.net/cchenliang/article/details/72799702","http://blog.csdn.net/cchenliang/article/details/53470236",
	"http://blog.csdn.net/cchenliang/article/details/72799637",
	"http://blog.csdn.net/cchenliang/article/details/72571850","http://blog.csdn.net/cchenliang/article/details/53525498",
	"http://blog.csdn.net/cchenliang/article/details/72571647",
	"http://blog.csdn.net/cchenliang/article/details/57956894","http://blog.csdn.net/cchenliang/article/details/53470236",
	"http://blog.csdn.net/cchenliang/article/details/57432403",
	"http://blog.csdn.net/cchenliang/article/details/57428974",
	"http://blog.csdn.net/cchenliang/article/details/53994831",
	"http://blog.csdn.net/cchenliang/article/details/53682734","http://blog.csdn.net/cchenliang/article/details/53470236",
	"http://blog.csdn.net/cchenliang/article/details/53572199",
	"http://blog.csdn.net/cchenliang/article/details/53570110",
	"http://blog.csdn.net/cchenliang/article/details/53525498",
	"http://blog.csdn.net/cchenliang/article/details/53470236",
	"http://blog.csdn.net/cchenliang/article/details/53467071"
]
// 2017年7月22日 刷记录
/*  {"53467071":99,"53470236":428,"53525498":275,"53570110":90,"53572199":75,"53682734":89,"53994831":79,
 "57428974":89,"57432403":93,"57956894":81,"72571647":84,"72571850":100,"72799637":76,"72799702":78,"728120
 79":78,"72829165":100,"72877051":293,"72877199":91,"73060841":69,"73251804":103,"73351094":98,"74013278":7
 2,"74959098":96,"75003399":265}
* */
//var netSite = ["http://www.jianshu.com/p/627eed6d70c9"]
var counts = 0;
var generateRanTime = function(){
	// 一天 24*60*60 秒 *1000 ms，下方一天两百四十次
	//return Math.floor(Math.random()*360*1000);
	// 每分钟2，3次
	 return Math.floor( Math.random()*30*1000 );
	// return 333;
}
var addCount = {};
var getArticle = function(){
	return netSite[ Math.floor(Math.random()*netSite.length) ];
	//return "http://www.jianshu.com/p/627eed6d70c9";
}

function addVisit(){
	var url = getArticle();
	var interval = generateRanTime();
	//console.log(url);
	if(counts++ > 3000){
		console.log(addCount);
		console.log( "汇总",JSON.stringify(addCount) );
		return ;
	};
	try{
		http.get(url,function(req,res){
			 //var html='';
			 //   req.on('data',function(data){
			 //       html+=data;
			 //   });
			 //   req.on('end',function(){
			 //       console.info(html);
			 //   });

			var d = new Date();
			addCount[url.substring(48)] ? addCount[url.substring(48)]++ : addCount[url.substring(48)] = 1;
			console.log(''+counts,"at "+ d.getFullYear()+"-"+ (d.getMonth()+1)+"-"+ d.getDate()+" "+ d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),"for ",url.substring(48),addCount[url.substring(48)],"next will after:",interval);

		});
	}catch(e){
		setTimeout(addVisit, 10*60*1000);
	}


	//console.log(interval);
	setTimeout(addVisit, interval);
}

addVisit();
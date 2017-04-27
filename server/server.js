// 사용 모듈 로드
var express = require('express');
var app = express();
var fs = require('fs'); 

// 포트 설정
app.listen(3303, function(){
	console.log('server start.')
})


app.get("/", function(req, res){ // 웹서버 기본주소로 접속할 경우 실행 
	fs.readFile("index.html", function(error, data){ // index.html 로드
		if(error){
			console.log(error);
		}else{
			res.writeHead(200, {'Content-Type':'text/html'}); // head type
			res.end(data); // load html resources
		}
	})
})
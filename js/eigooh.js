(function (window, $, undefined) {
  var
  // 한자 DB (json)
  engJson = "",
  // 문제 리스트 (한글만 들어있음)
  questionList = [],
  // 문제 리스트 (랜덤처리 끝난 후)
  mixedQuestionList = [],  
  // 문제 좌표 번호 
  questionCdn  = -1;

	var CIDX = 0;
	function htmlInit(proc){

		mixedQuestionList = [];
		questionList = [];
		engJson = "";
		questionCdn = -1;

		// js에 있는 문자열을 json화 후 localstorage에 json을 저장 
		if($("#name").val() == ""){
			$("#name").val(CIDX);
			storageInput(CIDX);
		}else{
			storageInput($("#name").val());
		}

		engJson = getJsonData();

		for(var key in engJson){
		   questionList.push(engJson[key][1]);
	  	}
	  
		switch(proc){
			case "testE":
				initForTestHtml();			
			break;
			case "studyE":
				initForStudyHtml();
			break;

		}
	}

	function initForStudyHtml(){

	}

	function initForTestHtml(){

	  var c = 0;
	  var x = [];
	  while(questionList.length != mixedQuestionList.length){
	    //랜덤 숫자를 추출한다
	    tempcnt = Math.floor((Math.random() * questionList.length)); 

	    //랜덤숫자가 중복된게 없는지 검사한다   
	    var already = false;
	    for(var i =0; i<x.length; i++){
	      if(x[i] == tempcnt){
	        already = true;
	      }
	    }

	    if(!already){
	      //해당 랜덤 숫자를 배열에 순서대로 저장한다
	      x[c] = tempcnt;
	      //저장된 랜덤숫자의 배열을 새 배열에 순서대로 넣는다
	      mixedQuestionList[c] = questionList[tempcnt];
	      c++;
	    }
	  }   
	}

	// 로컬스토리지에 문자데이터 저장 
	function storageInput(no){
		var key = "phase"+no;

		// 일단 컨버팅
	    var sakana  = db[key].replace(new RegExp("　", 'g'), " ");
	    var manaita = sakana.split("@");
	    var sara    = ""; 

	    for(var i=0;i<manaita.length;i++){
	      var kakera = manaita[i].split(":");
	      var sushi  = '"' + kakera[0] + '":"'+ kakera[1] +'"';  
	      sara += sushi;

	      if(i<manaita.length-1){
	        sara += ",";
	      }

	    }

	    sara = "{" + sara + "}";

		localStorage.removeItem(key);
	    localStorage.removeItem(key+"_text");
	    localStorage.setItem(key, sara);
	    localStorage.setItem(key+"_text", sakana.replace("@", "\n"));	
	}

	function getJsonData(){
		var no = $("#name").val();
	    return JSON.parse(localStorage.getItem("phase"+no));
	}
	window.eoh = {
	    setQuestionList: function () {
	  		for(var key in engJson){
	    		questionList.push(engJson[key][1]);
	  		}    	
	    },
	    setQuestionCdn: function(cdn){
	    	questionCdn = cdn;
	    },
	    // 문제 호출
	    moveQuestion: function(idx){    	
	    	var tl = questionList.length;
	    	if(questionCdn<=0 && idx == -1){
	      		koh.setQuestionCdn(0);
	    	}else if(questionCdn==tl && idx == 1){
	      		koh.setQuestionCdn(questionlist.length-1);
	    	}else{
	      		koh.setQuestionCdn(questionCdn + idx);
	    	}

		    $("#tgt").html(questionCdn + ". " + mixedQuestionList[questionCdn]);
	    },
	    //페이지 이동 
	    pageMove: function(idx){
			var current = $("#name").val();
			current = new Number(current) + new Number(idx);
			var key = "phase"+current;
			if(db[key] != undefined){
				$("#name").val(current);
				htmlInit("test");
			}
	    },
	    changeForm: function(type){

			if($("#name").val() ==""){
				return;
			}

	    	var getSpan = function(type, d, dic, idx) {
				var aaa = [dic[d], d, dic[d]];

				var eng = "";
				var result = "";
				var width = "130px";
			
				if(type == 2){
					eng = d;
					width ="200px";
				}

//				console.log(aaa[type])
				result += "&nbsp;<span style='position: relative; display: inline-block; width: "+width+"; line-height: 15px; top: 27px; white-space:nowrap; text-align: center;'>" + eng + "<hr/><a style='position: relative; font-size: 12px; top: -10px;'>" + aaa[type] + "</a></span>&nbsp;";

				return result;
			}

			var dic = getJsonData();
			var ar = "";

			for(key in dic) {
				ar += "'" + key + "' ";
			}

			var idx = 0;
			for(d in dic) {		
				ar = ar.replace("'"+d+"'", getSpan(type, d, dic));
				idx++;
			}	
				
			//ar = ar.replace(new RegExp("。", 'gi'), "<BR />");
			document.getElementById("result").innerHTML = ar;


	    },
	    init: function(proc){
	    	htmlInit(proc);
	    }
	};
})(window, $);

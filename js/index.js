$(document).ready(function(){
    var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/i), isIE9 = navigator.userAgent.match('MSIE 9.0');
    if(!isMobile){
    	$(".introduce-item").removeClass("animate");
    	scrollLoad()
    }
    $("[data-toggle='tooltip']").tooltip();
    window.onload=actionBall
    window.onresize=function(){
    	clearInterval(timer)
    	actionBall()
    }
    var timer=null,
    	ballTime=20,
    	ballNum=50,
    	ballRadius=6,
    	ballSpeed=6,
    	colors=['rgb(70,222,222)', 'rgb(30,200,100)', 'rgb(238,20,130)', 'rgb(43,35,94)', 'rgb(255,200,100)', 'rgb(64,195,129)', 'rgb(5,11,250)', 'rgb(100,250,100)', 'rgb(0,255,255)', 'rgb(255,195,0)']; 	
    function actionBall () {
    	var mycanvas=document.getElementById("mycanvas");
    	var wid =document.body.clientWidth;
        var hei =document.body.clientHeight;
	    balls=drawBall(mycanvas,wid,hei);
	   	timer=setInterval(function() {
	      animateBall(mycanvas,balls)
	    }, ballTime)
	  }
      function createBall (w,h,colors,radius,speed) {
        let obj = {}
        obj.x = Math.random() * w
        obj.y = Math.random() * h
        obj.color = colors[Math.floor(Math.random() * colors.length)]
        obj.radius = Math.floor(Math.random() * radius + radius)
        obj.Vx = Math.floor(2*Math.random() * speed - speed) === 0 ? speed : Math.floor(2*Math.random() * speed - speed)
        obj.Vy = Math.floor(2*Math.random() * speed - speed) === 0 ? speed : Math.floor(2*Math.random() * speed - speed)
        return obj
      }
      function drawBall (el,w,h) {
      	var balls=[];
      	el.width=w;
      	el.height=h;
      	var ele = el.getContext('2d');
        for (var i = 0; i < ballNum; i++) {
          balls.push(createBall(w,h,colors,ballRadius,ballSpeed))
        }       
        ele.clearRect(0, 0, w, h)
        for (var j = 0; j < balls.length; j++) {
          ele.beginPath()
          ele.fillStyle = balls[j].color
          ele.arc(balls[j].x, balls[j].y, balls[j].radius, 0, 2 * Math.PI)
          ele.fill()
          ele.closePath()
        }
        return balls
      }
      function animateBall (el,balls) {
        let ele = el.getContext('2d')
        ele.clearRect(0, 0, el.width, el.height)
        for (let i = 0; i < balls.length; i++) {
          balls[i].x += balls[i].Vx
          balls[i].y += balls[i].Vy
          balls[i].x < 0 || balls[i].x >el.width ? balls[i].Vx = -balls[i].Vx : balls[i].Vx = balls[i].Vx
          balls[i].y < 0 || balls[i].y >el.height ? balls[i].Vy = -balls[i].Vy : balls[i].Vy = balls[i].Vy
          ele.beginPath()
          ele.fillStyle = balls[i].color
          ele.arc(balls[i].x + balls[i].Vx, balls[i].y + balls[i].Vy, balls[i].radius, 0, 2 * Math.PI)
          ele.fill()
          ele.closePath()
        }
      }
    function scrollLoad(){
    	var items=$(".introduce-item");
    	for(var i=0;i<items.length;i++){
    		if($(window).scrollTop()>items.eq(i).offset().top-$(window).height()*0.9){
    			items.eq(i).addClass("animate")
    		}
    	}
    }
    $("#nav-content").on("click",".to-content",function(e){
    	var _this=$(this);
    	_this.parent().addClass("active").siblings().removeClass("active")
    	var top;
    	if(this.hash==="#home"){
    		top=0
    	}else{
    		top=$(this.hash).offset().top
    	}	
    	$("body,html").animate({
    		scrollTop:top
    	},200)
    })
    $(document).scroll(function(){
		scrollLoad();
    	if($(this).scrollTop()>300){
    		$("#totop").show()
    	}else{
    		$("#totop").hide()
    	}
    })
    $("#totop").click(function(){
    	var _this=$(this)
    	$("body,html").animate({
    		scrollTop:0
    	},600,function(){
    		_this.hide()
    	})
    })
    $("#article-content").on("click",".article-item-title",function(e){
    	var e=e||window.event;
    	if(e.target.tagName==="A"){
    		e.stopPropagation();
    		return
    	}  	
    	var aitem=$(this).parent();
    	aitem.toggleClass("active").siblings().removeClass("active")
    })
    $.get("css-data.json",function(res){
    	var data=res.data;
    	var content="";
    	for(var i=0;i<data.length;i++){
    		content+="<div class='article-item'>",
			content+="<div class='article-item-title'>",
			content+="<h4>"+data[i].title+"<i class='fa fa-angle-right' aria-hidden='true'></i></h4>";
			if(data[i].isOriginal){
				content+="<p>——作者:"+data[i].author+"</p>";
			}else{
				content+="<p><span>——作者:</span><a href='"+data[i].authorLink+"' target='_blank'>"+data[i].author+"</a></p>",
				content+="<p><span>——原文:</span><a href='"+data[i].articleLink+"' target='_blank'>"+data[i].title+"</a></p>";
			}
			content+="</div>",
			content+="<div class='article-item-detail'>";
			for(var j=0;j<data[i].contentData.length;j++){
				switch(data[i].contentData[j].type){
					case "js":content+="<pre class='article-item-js'>"+data[i].contentData[j].content+"</pre>";
					break;
					case "img":content+="<div class='article-item-img'><img src='"+data[i].contentData[j].content+"'><p>"+data[i].contentData[j].explain+"</p></div>";
					break;
					case "text":content+="<div class='article-item-text'>"+data[i].contentData[j].content+"</div>";
					break;
					default: break;
				}
			}
			content+="</div></div>";
    	}
    	$("#article-content").append(content);
    	$(".loading").remove();
    })
})
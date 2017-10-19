$(document).ready(function(){
     new JParticles.particle('#particle',{
     	resize:false,
     	range: 100,
     })
    var isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/i), isIE9 = navigator.userAgent.match('MSIE 9.0');
    if(!isMobile){
    	$(".introduce-item").removeClass("animate");
    	scrollLoad()
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
    	$("#article-content").append(content)
    })
})
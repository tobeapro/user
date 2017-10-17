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
})
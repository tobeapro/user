$(document).ready(function(){
     new JParticles.particle('#particle',{
     	resize:false
     });
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
    	},600)
    })
    $(document).scroll(function(){
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
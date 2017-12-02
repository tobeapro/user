(function($){
	var setting ={
	    show:function(){
	       var mask=document.createElement("div");
			mask.className="loading";
			document.body.appendChild(mask);
	    },
	    hide:function(){
	      $(".loading").remove()
	    }
	  }
	  $.fn.loading=function(name){
	    this.each(function(){
	       return setting[name].apply(this)
	    })
	  }
})(jQuery)
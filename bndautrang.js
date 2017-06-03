
//website https://www.facebook.com/Goimassagehanoi/

(function(JQuery) {
    JQuery.fn.quangkim = function(options) {        
        var defaults = {  
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 300, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-quangkim-modal' //the class of a button or element that will close an open modal
    	}; 

        var options = JQuery.extend({}, defaults, options); 
	
        return this.each(function() {
        	var modal = JQuery(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = JQuery('.quangkim-modal-bg');

			if(modalBG.length == 0) {
				modalBG = JQuery('<div class="quangkim-modal-bg" />').insertAfter(modal);
			}		    
			modal.bind('Quangkim:open', function () {
			  modalBG.unbind('click.modalEvent');
				JQuery('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': JQuery(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": JQuery(document).scrollTop()+topMeasure + 'px',
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': JQuery(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible', 'top':JQuery(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});	
						unlockModal()				
					}
				}
				modal.unbind('Quangkim:open');
			}); 	

			modal.bind('Quangkim:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  JQuery(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('quangkim:close');
			});     
   	
    	modal.trigger('quangkim:open')
			
			//Close Modal Listeners
			var closeButton = JQuery('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
			  modal.trigger('quangkim:close')
			});
			
			if(options.closeonbackgroundclick) {
				modalBG.css({"cursor":"pointer"})
				modalBG.bind('click.modalEvent', function () {
				  modal.trigger('quangkim:close')
				});
			}
			JQuery('body').keyup(function(e) {
        		if(e.which===27){ modal.trigger('quangkim:close'); } // 27 is the keycode for the Escape key
			});
			
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
        });//each call
    }//orbit plugin call
})(jQuery);
        
jQuery(window).load(function() {
		if(document.cookie.indexOf("adf") == -1)
		{
			document.cookie = "adfpopunder1=adf";
			var divpopup = document.createElement("div");
			jQuery(divpopup).attr('id', 'myModal');
			jQuery(divpopup).attr('class', 'linhnguyen-modal');
			jQuery( "body" ).append(divpopup);
			jQuery("#myModal").html("<a href='http://goimassagehn.blogspot.com/' target='_blank'><img src='http://g.vatgia.vn/gallery_img/5/nvr1427042752.JPG' width='500px'/><br/>Mua Gối Massage Hồng Ngoại</a>. Liên hệ: 0982723391. <h2><a class='close-linhnguyen-modal'>X</a></h2>");
			jQuery('#myModal').QuangKim(jQuery('#myModal').data());
		}
});

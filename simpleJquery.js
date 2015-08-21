var jQuery = function( selector ) {
	return new jQuery.fn.init( selector );
}

jQuery.fn = jQuery.prototype = {
	init: function( selector ){
		var selector = this.selector = document.querySelector( selector );
		this.unwrap = function(){
			var parentSelector = selector.parentNode;
			parentSelector.parentNode.replaceChild( selector,parentSelector );
		};
		this.wrap = function(){
			
		};
		this.wrapAll = function(){

		}
		return this;
	}
}


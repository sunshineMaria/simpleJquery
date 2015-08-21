var jQuery = function( selector ) {
	return new jQuery.fn.init( selector );
}

jQuery.fn = jQuery.prototype = {
	init: function( selector ){
		var selector = this.selector = document.querySelector( selector );
		this.unwrap = function(){

		};
		this.wrap = function(){

		};
		this.wrapAll = function(){

		}
		return this;
	}
}


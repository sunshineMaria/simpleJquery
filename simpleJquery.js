var jQuery = function( selector ) {
	for ( var i = 0; i< detachedObj.length; i++ ){
		if( selector == detachedObj[i].selector ){
			return detachedObj[i];
		}
	}
	return new jQueryInit( selector );
}

var jQueryInit = function( selector ){
	this.selector = selector;
	if( selector == undefined || selector == ''){
		throw 'selector was not defined' ;
	}else{
		this.element = document.querySelector( selector );
		this.isJqueryObj = true;
	}
}

var detachedObj = [];

jQueryInit.prototype = {
	/* Remove the parent of the set of matched elements from the DOM, leaving the matched elements in their place */ 
	unwrap : function(){
		var el = this.element;
		var elParent = el.parentNode;
		if ( elParent != null && el.nodeName != 'BODY' && elParent.nodeName != 'BODY' && elParent.parentNode ){
			elParent.parentNode.replaceChild( el, elParent );
		}else{
			throw '不满足unwrap条件';
		}
		return this;
	},
	/**/
	wrap : function( html ){
		var el = this.element;
		var elParent = el.parentNode;	
		var originContent = el.outerHTML;
		var newEl = createNewHTML( html, originContent );
		elParent.replaceChild( newEl, el );
		return this;
	},
	wrapAll: function(){
		// 因为this.element仅是第一个node对象，所以现在写这个方法和wrap是一样的，以后再扩展
	},
	wrapInner: function( html ){
		// 把el里的内容清空，新建一个
		var el = this.element;
		var originContent = el.innerHTML;
		var newEl = createNewHTML( html, originContent );
		el.innerHTML = '';
		el.appendChild( newEl );
		return this;
	},
	append: function( html ){
		// 没有考虑html为jQuery对象的情况，其实这个判断一下它有没有一个特定的我自定义的属性就可以。
		var el = this.element;
		if( html.isJqueryObj ){
			html = html.element;
		}
		var container = document.createElement( 'div' );
		var temp;
		if( typeof html == 'object' ){
			var hlen = html.length;
			if( hlen > 1 ){
				temp = createTempContainer( html );
			}else{
				temp = html;
			}
		}else{
			container.innerHTML = html;
			var nodes = container.childNodes;
			var temp = createTempContainer( nodes );
		}
		el.appendChild( temp );
		return this;
	},
	/**
	 * 只考虑了调用它的是通过jQuery创建的对象，就是页面已有的元素。
	 * 没有实现创建一个页面没有的元素，然后作为jQuery对象调用该方法。
	 */
	appendTo: function( target ){
		var el = this.element;
		// 首先区分target是字符串还是Element对象
		if( typeof target == 'string' ){
			tEl = document.querySelector( target );
			throw Error('can not find the target element');
		}else{
			tEl = target;
		}
		tEl.appendChild( el );
		return tEl;
	},
	html: function( html ){
		var el = this.element;
		if( !html ){
			return el.innerHTML;
		}else if( typeof html == 'string' ){
			/* 用新的内容替换这些元素前，jQuery从子元素删除其他结构，如数据和事件处理程序。*/
			// 问题：不懂上面这句话的意思。
			var nodeList = el.childNodes;
			var len = nodeList.length;
			for( var i = len-1; i >= 0; i-- ){
				el.removeChild( nodeList[i] );
			}
			el.innerHTML = html;
			return this;
		}
	},
	prepend: function( html ){
		var el = this.element;
		var container = document.createElement( 'div' );
		var temp;
		if( typeof html == 'object'){
			var hlen = html.length;
			if( hlen > 1 ){
				temp = createTempContainer( html );
			}else{
				temp = html;
			}
		}else{
			container.innerHTML = html;
			var nodes = container.childNodes;
			var temp = createTempContainer( nodes );
		}
		el.insertBefore( temp, el.childNodes[0] );
		return this;
	},
	prependTo: function( target ){
		var el = this.element;
		// 首先区分target是字符串还是Element对象
		if( typeof target == 'string' ){
			tEl = jQuery( target );
			throw Error('can not find the target element');
		}else{
			tEl = target;
		}
		this.prepend.call( tEl, el );
		return tEl;
	},
	text: function( text ){
		var el = this.element;
		var resultStr="";
		if( !text ){
			// 需要遍历节点树[后来证明不需要]
			// resultStr = getText( el );
			// return resultStr;
			return el.textContent;
		}else{
			el.textContent = text;
		}
	},
	after: function( html ){
		var el = this.element;
		var elParent = el.parentNode;
		var container = document.createElement( 'div' );
		var outerContainer = document.createElement( 'div' );
		var temp;
		var nodes;
		if( typeof html == 'object'){
			var hlen = html.length;
			if( hlen > 1 ){
				temp = createTempContainer( html );
			}else{
				temp = html;
			}
		}else{
			container.innerHTML = html;
			nodes = container.childNodes;
			temp = createTempContainer( nodes );
		}
		outerContainer.appendChild( el.cloneNode( true ) );
		outerContainer.appendChild( temp );
		nodes = outerContainer.childNodes;
		temp = createTempContainer( nodes );
		elParent.replaceChild( temp, el );
		return this;
	},
	insertAfter: function( target ){
		var el = this.element;
		// 首先区分target是字符串还是Element对象
		if( typeof target == 'string' ){
			tEl = jQuery( target );

		}else{
			tEl = target;
		}
		this.after.call( tEl, el );
		return tEl;
	},
	before: function( html ){
		var el = this.element;
		var elParent = el.parentNode;
		var container = document.createElement( 'div' );
		var outerContainer = document.createElement( 'div' );
		var temp;
		var nodes;
		if( typeof html == 'object'){
			var hlen = html.length;
			if( hlen > 1 ){
				temp = createTempContainer( html );
			}else{
				temp = html;
			}
		}else{
			container.innerHTML = html;
			nodes = container.childNodes;
			temp = createTempContainer( nodes );
		}
		outerContainer.appendChild( temp );
		outerContainer.appendChild( el.cloneNode( true ) );
		nodes = outerContainer.childNodes;
		temp = createTempContainer( nodes );
		elParent.replaceChild( temp, el );
		return this;
	},
	insertBefore: function( target ){
		var el = this.element;
		// 首先区分target是字符串还是Element对象
		if( typeof target == 'string' ){
			tEl = jQuery( target );
			throw Error('can not find the target element');
		}else{
			tEl = target;
		}
		this.before.call( tEl, el );
		return tEl;
	},
	detach: function(){
		var el = this.element;
		var elParent = el.parentNode;
		elParent.removeChild( el );
		detachedObj.push( this );
		return this;
	},
	empty: function(){
		var el = this.element;
		el.innerHTML = "";
	},
	remove: function(){
		var el = this.element;
		var elParent = el.parentNode;
		el.innerHTML = "";
		elParent.removeChild( el );
		return this;
	},
	replaceWith: function( newContent ){
		//用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合。
		var el = this.element;
		var elParent = el.parentNode;
		var container = document.createElement( 'div' );
		var temp;
		if( typeof newContent == 'object'){
			var hlen = newContent.length;
			if( hlen > 1 ){
				temp = createTempContainer( newContent );
			}else{
				temp = newContent;
			}
		}else{
			container.innerHTML = newContent;
			var nodes = container.childNodes;
			var temp = createTempContainer( nodes );
		}
		elParent.replaceChild( temp, el );
		return this;
	},
	replaceAll: function( target ){
		var el = this.element;
		// 首先区分target是字符串还是Element对象
		if( typeof target == 'string' ){
			tEl = jQuery( target );
			if( !tEl.element ){
				throw Error('can not find the target element');
				return false;
			}

		}else{
			tEl = target;
		}
		this.replaceWith.call( tEl, el );
		return tEl;
	}


} 

function createNewHTML( html, originContent ){
	var container = document.createElement('div');
	var innerContainer = container;
	var containerList = [];
	var len;
	if( typeof html == 'object' ){
		container.appendChild( html );
	}else{
		container.innerHTML = html;
	}
	while( innerContainer.hasChildNodes() ){
		innerContainer = innerContainer.firstChild;
		containerList.push( innerContainer );
	}
	innerContainer.innerHTML = originContent;
	len = containerList.length;
	for( var i = len-1; i > 0; i--  ){
		containerList[i-1].appendChild( containerList[i] );
	}
	return containerList[0];
}

function createTempContainer( nodeList ){
	var fragement = document.createDocumentFragment();
	if( nodeList.nodeType == '3' ){
		fragement.appendChild( nodeList.cloneNode( true ) );
	}else{
		var len = nodeList.length;
		for ( var i = 0; i < len; i++ ){
			fragement.appendChild( nodeList[i].cloneNode(true) );
		}
	}
	return fragement;
}

/* 以下方法因为javascript的textContent属性变的没用了！—_— */
function getText( node ){
	var str = "";
	traverseNode( node );
	return str;
	function traverseNode( node ){
		if( node.hasChildNodes() ){
			var nodeList = node.childNodes;
			var len = nodeList.length;
			for( var i = 0; i < len; i++ ){
				var currentNode = nodeList[i];
				if( currentNode.nodeType == 3 ){
					var isWhiteSpace = ( /^\s+$/.test( currentNode.nodeValue ));
					if( !isWhiteSpace ){
						str += currentNode.nodeValue;
						console.log( str );
					}
				}else if( currentNode.nodeType == 1 ){
					traverseNode( currentNode );
				}
			}
		}
	};
}

/**
 * 问题列表：
 * 1.参数为function()的这种情况没有考虑。
 * 2.html方法中写的问题
 * 各个方法的返回值不是很清楚。[html(string)的返回值是this，html()的返回值是元素里的内容],
 * append()和preend()方法返回调用它的jquery对象，而appendTo()则返回调用它的jquery对象的Element
 * 3.createTempContainer中判断了node类型为是不是文本类型，可是要是还有其他属性呢？
 * 因为DOM中，每个部分都是节点，文档节点，元素节点，属性节点，文本节点，
 * Element对象可以拥有类型为元素节点、文本节点、注释节点的子节点。
 * 4.jquery的文档中，写qppend方法的参数为四种类型：
 * DOM element, array of elements, HTML string, or jQuery object。
 * document.createTextNode( "Hello" )，这个算是element？可是这个对象的length却又不是1。
 * 为什么呀？好像它当成字符串对象给处理了，所以length返回5。应该如何使用呢？
 * 
 */
/*
这个方法把页面加载完毕时要执行的函数创建为一个队列。
如果想把上面的四个函数添加到列队里面去，只需
addLoadEvent(pzh1);
addLoadEvent(pzh2);
addLoadEvent(pzh3);
addLoadEvent(pzh4);
即可
*/

function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
};

/*
insertAfter()函数，因为DOM并没有提供insertAfter()方法，所以当添加元素到某元素后面时，就用此方法，
格式：insertAfter(新元素,目标元素)，这样新元素就在目标元素的后面了。同添加到元素前面对应。
*/
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
};

//把某个元素添加到另个元素中，做为子级，放在第一位。用法：insertBefore( 被添加的父级,要添加的元素 )，兼容IE678
function insertBefore(parent, obj) {
	if(parent.children[0]) {
		parent.insertBefore(obj, parent.children[0]);
	} else {
		parent.appendChild(obj);
	}
}

/*
获取当前元素的下一个兄弟元素。如：elem = getNextElement( headers[i].nextSibling );格式为：elem = getNextElement( 当前元素.nextSibling )
*/
function getNextElement(node) {
	if(node.nodeType == 1) {
		return node;
	}
	if(node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}

//获取ID的方法		如：var oW=id("welcome");
function id(obj) {
	return document.getElementById(obj);
}

//通过class获取元素。格式：getElementsByClassName( 搜索起点-祖先级,类名 );	//IE8以上通过新方法获取。IE8及以下用老方法获取。
function getElementsByClassName(node, classname) {
	if(node.getElementsByClassName) {
		return node.getElementsByClassName(classname);
	} else {
		var arr = [];
		var elems = node.getElementsByTagName("*");
		for(var i = 0; i < elems.length; i++) {
			var aClassName = elems[i].className.split(" ");
			for(var j = 0; j < aClassName.length; j++) {
				if(aClassName[j] == classname) {
					arr.push(elems[i]);
					break;
				}
			}
		}
		return arr;
	}
}

//添加class
function addClass(obj, sClass) {
	var aClass = obj.className.split(' ');
	if(!obj.className) {
		obj.className = sClass;
		return;
	}
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] === sClass) return;
	}
	obj.className += ' ' + sClass;
}

//删除class		如：removeClass(oW,"pageShow");
function removeClass(obj, sClass) {
	var aClass = obj.className.split(' ');
	if(!obj.className) return;
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] === sClass) {
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			break;
		}
	}
}

//addEventListener		如：bind(oW,"click",fn);//绑定事件格式：bind(元素，"事件"，fn函数)，这种方法添加的不能取消事件。
function bind(obj, ev, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, function() {
			fn.call(obj);
		});
	}
}

/*
 * 原生的自定义事件，以下bind()函数和fireEvent()都必须同时使用。
 */
function bind(obj, ev, fn) {

	//建立应射关系
	obj.listeners = obj.listeners || {}; //好比楼层，第一次可能没有，就会创建
	obj.listeners[ev] = obj.listeners[ev] || []; //好比书架，第一次也可能没有，就会创建
	obj.listeners[ev].push(fn);

	//如果是元素，才走进来
	if(obj.nodeType) {
		if(obj.addEventListener) {
			obj.addEventListener(ev, fn, false);
		} else {
			obj.attachEvent('on' + ev, function() {
				fn.call(obj);
			});
		}
	}
}

//主动触发自定义事件，它接收两个参数，一个是元素，一个是自定义事件（默认事件也可以）
function fireEvent(obj, ev) {
	if(obj.listeners && obj.listeners[ev]) {
		for(var i = 0; i < obj.listeners[ev].length; i++) {
			obj.listeners[ev][i].call(obj);
		}
	}
}

//获取可视区域的宽高	如：view().h+"px";
function view() {
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	};
}

//获取元素的样式属性值。使用方法：getStyle（元素，"样式属性名"）;getStyle(oDiv,"width"); 获取的是带有单位的值
//注意一点，获取background时，要用backgroundColor。要用单一样式。不要用复合样式。有兼容性的问题。而且不要拿来做判断。还有，不要用来获取没有给元素设置的样式。
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]; //678支持
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//返回元素到浏览器左边和顶部的绝对值(不带单位)。用法：getPos(元素).left	返回元素到浏览器左边的绝对值。getPos(元素).top	返回元素到浏览器顶部的绝对值
function getPos(obj) {
	var pos = { left: 0, top: 0 };
	while(obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	};
	return pos;
};

//获取元素的第一个子节点，这里做了兼容处理，即便元素没有子节点，也不会报错，但是，实际开发中，还是用 元素.children[0]好。
function firstChild(obj) {
	var oFirst = obj.firstElementChild || obj.firstChild;
	if(oFirst == null || oFirst.nodeType != 1) {
		return null;
	};
	return oFirst;
}

//元素的第一个子元素或最后一个子元素。还是使用  元素.children[0]  或 元素.children[元素.children.length-1]来代替。

//返回当前元素的下一个兄弟元素。用法：nextSibling( 当前元素 )   一定要注意：下一个兄弟元素必须存在，否则报错。
function nextSibling(obj) {
	var oNext = obj.nextElementSibling || obj.nextSibling;
	return oNext;
}

//返回当前元素的上一个兄弟元素。用法：previousSibling( 当前元素 )   一定要注意：上一个兄弟元素必须存在，否则报错
function previousSibling(obj) {
	var oPrev = obj.previousElementSibling || obj.previousSibling;
	return oPrev;
}

//获取滚动条的距离
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

//巅倒字符串，如abc巅倒成cba
function stringReverse(str) {
	return str.split("").reverse().join("");
}

//数组sort()升序排序函数
function compare(value1, value2) {
	if(value1 < value2) {
		return -1;
	} else if(value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}

// 编程实现indexOf方法，找到返回下标，找不到返回-1，兼容IE低版本
// 它接收三个参数，数组，要找的元素，起始位置（起始位置不传从0开始）
function arrIndexOf(arr, val, index) {
	var i = typeof(index) === 'undefined' ? 0 : index;
	var len = arr.length;
	for(; i < len; i++) {
		if(arr[i] === val) {
			return i;
		}
	}
	return -1;
}

//数组的最小值及它的下标
function arrMin(arr) {
	var obj = {
		value: Infinity,
		index: -1
	}
	for(var i = 0, n = arr.length; i < n; i++) {
		if(obj.value > arr[i]) {
			obj.value = arr[i];
			obj.index = i;
		}
	}
	return obj;
}

//数组的最大值及它的下标
function arrMax(arr) {
	var obj = {
		value: -Infinity,
		index: -1
	}
	for(var i = 0, n = arr.length; i < n; i++) {
		if(obj.value < arr[i]) {
			obj.value = arr[i];
			obj.index = i;
		}
	}
	return obj;
}

/**
 * 对象克隆
 * 支持基本数据类型及对象
 * 递归方法
 */
function clone(obj) {
	var o;
	switch(typeof obj) {
		case "undefined":
			break;
		case "string":
			o = obj + "";
			break;
		case "number":
			o = obj - 0;
			break;
		case "boolean":
			o = obj;
			break;
		case "object": // object 分为两种情况 对象（Object）或数组（Array）
			if(obj === null) {
				o = null;
			} else {
				if(Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
					o = [];
					for(var i = 0; i < obj.length; i++) {
						o.push(clone(obj[i]));
					}
				} else {
					o = {};
					for(var k in obj) {
						o[k] = clone(obj[k]);
					}
				}
			}
			break;
		default:
			o = obj;
			break;
	}
	return o;
}

//浅拷贝
function copy(obj) {
	var newObj = {};
	for(var attr in obj) {
		newObj[attr] = obj[attr];
	}
	return newObj;
}

//深拷贝
function deepCopy(obj) {
	if(typeof obj != "object") { //如果最后一层不是对象了，就返回它
		return obj;
	}
	var newObj = {};
	for(var attr in obj) {
		newObj[attr] = deepCopy(obj[attr]);
	}
	return newObj;
}

/*
测试地址：file:///C:/Users/Administrator/Desktop/Untitled-2.html?pzh=%E5%BD%AD%E4%BD%9C%E6%B4%AA&name=29
使用方法：
var args = getQueryStringArgs();
console.log(args.pzh);
console.log(args['name']);
*/
//取得浏览器地址中问号以后的，传递Key值，得到对应的值
function getQueryStringArgs() {
	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : "");
	//保存数据的对象
	var args = {};
	//取得每一项
	var items = qs.length ? qs.split("&") : [];
	var item = null;
	var name = null;
	var value = null;
	var len = items.length;
	for(var i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if(name.length) {
			args[name] = value;
		}
	}
	return args;
}

/*类数组转换成数组*/
function convertToArray(nodes) {
	var array = null;
	try {
		array = Array.prototype.slice.call(nodes, 0); //针对非IE浏览器
	} catch(ex) {
		array = [];
		for(var i = 0, len = nodes.length; i < len; i++) {
			array.push(nodes[i]);
		}
	}
	return array;
}

//返回元素所有的属性（兼容IE8及以上），以字符串返回，以空格分开，如title="你好" id="aa" class="pzh"
function outputAttributes(element) {
	var pairs = [];
	var attrName = null;
	var attrValue = null;
	//element.attributes返回元素的所有属性
	for(var i = 0, len = element.attributes.length; i < len; i++) {
		attrName = element.attributes[i].nodeName;
		attrValue = element.attributes[i].nodeValue;
		pairs.push(attrName + "=\"" + attrValue + "\"");
	}
	return pairs.join(" ");
}

//取得选择的文本，用在input单行文本和textarea时，可以知道选取了哪些文本内容，全兼容
function getSelectedText(textbox) {
	if(typeof textbox.selectionStart == "number") {
		return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
	} else if(document.selection) {
		return document.selection.createRange().text;
	}
}

//数组去重各种方法比较
//利用数组的indexOf方法，参数为要去重的数组，返回去重后的数组，兼容IE9及以上。
function unique(arr) {
	var result = [];
	for(var i = 0; i < arr.length; i++) {
		if(result.indexOf(arr[i]) == -1) {
			result.push(arr[i]);
		}
	}
	return result;
}

//接上
//因为IE8及以下的浏览器不支持indexOf这个方法，所以这里判断一下，如果是不支持这个方法，手动给加一个。
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] === obj) {
				return i;
			}
		}
		return -1;
	}
}

//利用hash表,可能会出现字符串和数字一样的话出错，如var a = [1, 2, 3, 4, '3', 5],会返回[1, 2, 3, 4, 5]。
function unique(arr) {
	var hash = {},
		result = [];
	for(var i = 0; i < arr.length; i++) {
		if(!hash[arr[i]]) {
			hash[arr[i]] = true;
			result.push(arr[i]);
		}
	}
	return result;
}

//求两个数组交集，参数为求交集的两个数组，返回交集的数组。IE9及以上支持
function crossArray(arr1, arr2) {
	return arr1.filter(function(n) {
		return arr2.indexOf(n) != -1;
	});
}

//求两个数组的并集，方法原理：连接两个数组并去重
function andSet(arr1, arr2) {
	var arr = arr1.concat(arr2); //连接两个数组
	return unique(arr); //去重
}

//Function.prototype.bind方法是 ES5 里的新增的，所以，在IE8及以下不支持。添加此方法，以支持IE8及以下。 
if(!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if(typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP ?
					this :
					oThis || this,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

//String.prototype.trim是ES5中新增的方法。使用下面的使IE8及以下支持str.trim()方法。
if(!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}

//返回两个数之间的随机数。如返回2到10之间的，包括2和10。selectFrom(2, 10)，参见高级程序设计136页。
function selectFrom(lowerValue, upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

//存储localStorage中的数据（本地存储	logo丝多瑞至）
var store = {
	//保存数据
	save: function(key, value) {
		//第二个参数是字符串，下面我们要存的是数组，所以要把它转成字符串
		localStorage.setItem(key, JSON.stringify(value));
	},

	//获取数据
	fetch: function(key) {
		//它取出来的也是字符串，所以要转一下
		//另外这里有两种情况，一种是取到了，一种是没有取到，没有取到我们就返回一个空的数组，针对的这里是数组的情况
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

// 自己实现的forEach方法，它没有返回值，传入两个参数，一个是要遍历的数组，一个是回调，回调函数接收三个参数，value, index, arr
function foreach(arr, callback) {
	for(var i = 0, len = arr.length; i < len; i++) {
		callback(arr[i], i, arr);
	}
}

// 自己实现的map方法，返回操作每一项返回的值组成的新数组。它接收两个参数，一个要遍历的数组，一个回调函数，回调函数接收三个参数，分别是value, index, arr
function mapFn(arr, callback) {
	var newArr = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		newArr.push(callback(arr[i], i, arr));
	}
	return newArr;
}

// 自己实现的filter方法，有返回值，返回回调函数返回true时的项组成的数组。它接收两个参数，一个是要遍历的数组，一个是回调函数，回调函数接收三个参数，分别是value, index, arr
function filter(arr, callback) {
	var newArr = [];
	for(var i = 0, len = arr.length; i < len; i++) {
		if(callback(arr[i], i, arr)) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

/**
 * 传入年、月，获取这个月有多少天和第一天星期几
 * 比如：2017, 4，返回4月的天数和4月的第一天星期几
 * 原理：月份哪里参数为0，即到了上个月的最后一天。月份自动减1，且这样不用考虑闰年的情况。
 * 这里要传入现实生活中用的年月。
 * */
function getDayWeek(year, month) {
	return {
		day: new Date(year, month, 0).getDate(),
		week: new Date(year, month - 1, 1).getDay()
	}
}
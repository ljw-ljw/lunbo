
/*
 *  //首先我们准备把代码这样改：
 *  function slide(){
 *     //把下面的所有代码全部粘贴过来
 *	//轮播的代码
 *   }
 *  slide();
 * 
 */
/*
 function slide() {
	// 先规定好每张图片处于的位置和状态
	var states = [{
		zIndex: 1,
		width: 120,
		height: 150,
		top: 69,
		left: 134,
		ZOpacity: 0.2
	}, {
		zIndex: 2,
		width: 130,
		height: 170,
		top: 59,
		left: 0,
		ZOpacity: 0.5
	}, {
		zIndex: 3,
		width: 170,
		height: 218,
		top: 35,
		left: 110,
		ZOpacity: 0.7
	}, {
		zIndex: 4,
		width: 224,
		height: 288,
		top: 0,
		left: 263,
		ZOpacity: 1
	}, {
		zIndex: 3,
		width: 170,
		height: 218,
		top: 35,
		left: 470,
		ZOpacity: 0.7
	}, {
		zIndex: 2,
		width: 130,
		height: 170,
		top: 59,
		left: 620,
		ZOpacity: 0.5
	}, {
		zIndex: 1,
		width: 120,
		height: 150,
		top: 69,
		left: 500,
		ZOpacity: 0.2
	}];
	var lis = $('#box li');
	//让每个li 对应上面states的每个状态
	function move() {
		lis.each(function(index, ele) {
			var state = states[index];
			//修改li的透明度，若只是修改img的透明，最后的图片还是可以看到，所以就可修改li的透明度	
			$(ele).css('z-index', state.zIndex).finish().animate(state, 1000).find('img').css('opacity', state.ZOpacity);
		})
	}
	// 让li 从正中间展开
	move();

	//点击下一张，让轮播图发生偏移
	function next() {
		//原理 :把数组最后一个元素移到数组的第一位  
		// 往前面插入元素 用 unshift   删除 pop() states.pop()(默认删除最后一个)把数组最后一个元素删除  返回值就是删除的元素
		states.unshift(states.pop());
		move();
	}
	$('#box .prev').click(function() {
		states.push(states.shift());
		move();
	});

	$('#box .next').click(function() {
		next();
	});

	var pic = setInterval(next, 2500);
	$('#box li').add('#box section').hover(function() {
		clearInterval(pic);
	}, function() {
		pic = setInterval(next, 2500);
	});
};
// 调用全局变量 slide
 slide();

*/

 
 /*
  *  变量作用域问题：
  * 1.全局域[window]         2.函数域名(function 域)       3.block 域
  * 全局域:从页面被打开之后到页面被关闭之前始终存在的。
  * 函数域:存在于函数调用的一瞬间，(也不一定，考虑下闭包的存在)
  *
  *  闭包的理解:
  *  闭包的作用:可以保留函数的作用域(要不然闭包里面的函数move 就不能使用slide函数域里面的变量:states、lis 等)
  *  闭包产生的必要条件: 函数里面套函数(内函数要使用外层函数作用域里面的变量)
  * 
  *  全局变量会产生闭包吗？ 不会 ，没有闭包的意义(其实本身是最大的闭包)，因为全局变量存在全局域。
  *
  */



/*
 * 轮播图能否封装成插件？会产生什么问题
 * 1.插件中最好不要使用id，原因：插件是能够被重复使用，也就是说在同一个页面可能多次使用
 * 2.变量的命名和方法的命名: states、interval、move()、next()。用户在使用插件的时候，可能还会引入自己创建的 js 文件，若创建的文件中也有这样的命名，那么就会产生冲突
 * 3.标签 class 的的问题: prev、next。这些class太大众化了，谁写标签都想命名为 prev 或者 next，势必会冲突
 * 4.插件文件命名问题: index.js、index.css，命名大众化。比如这样修改:jQuery.ZYSlide.js
 *
 */

// 自运行的匿名函数
/*
(function(){
	alert(123);
})()

  //也是自运行的匿名函数
$(function(){
	alert(123);
});
*/
	(function($){
		//slide 函数调用只负责一个轮播功能
		// 也就是说只会产生一个轮播，这个函数的作用域只能分配一个轮播图 ，所以要求调用本函数的时候务必把当前轮播图的跟标签传递过来
		// 这里的形参 ele 就是某个轮播的跟标签
		var slide = function(ele,options){
			//转化为jquery标签对象
			var $ele = $(ele);
			//默认设置选项
			var setting = {
				//控制刚开炸开的时间
				delay:1000,
				//控制 interval 的时间(轮播速度)
				spend:2000
			};
			// 对象合并  ture是保证在数据合并的时候，setting于options有相似部分被覆盖
			$.extend(true,setting,options);
			//规定好每张图片处于的位置和状态
				var states = [{zIndex: 1,width: 120,height: 150,top: 69,left: 134,ZOpacity: 0.2}, 
				              {zIndex: 2,width: 130,height: 170,top: 59,left: 0,ZOpacity: 0.5},
				              {zIndex: 3,width: 170,height: 218,top: 35,left: 110,ZOpacity: 0.7},
				              {zIndex: 4,width: 224,height: 288,top: 0,left: 263,ZOpacity: 1}, 
				              {zIndex: 3,width: 170,height: 218,top: 35,left: 470,ZOpacity: 0.7}, 
				              {zIndex: 2,width: 130,height: 170,top: 59,left: 620,ZOpacity: 0.5},
				              {zIndex: 1,width: 120,height: 150,top: 69,left: 500,ZOpacity: 0.2}
				            ];
				var lis = $ele.find('li');
				//让每个li 对应上面states的每个状态
				function move() {
					lis.each(function(index, value) {
						var state = states[index];
						//修改li的透明度，若只是修改img的透明，最后的图片还是可以看到，所以就可修改li的透明度	
						$(value).css('z-index', state.zIndex).finish().animate(state, setting.delay).find('img').css('opacity', state.ZOpacity);
					})
				}
				// 让li 从正中间展开
				move();
			
				//点击下一张，让轮播图发生偏移
				function next() {
					//原理 :把数组最后一个元素移到数组的第一位  
					// 往前面插入元素 用 unshift   删除 pop() states.pop()(默认删除最后一个)把数组最后一个元素删除  返回值就是删除的元素
					states.unshift(states.pop());
					move();
				}
				$ele.find('.zy-prev').click(function() {
					states.push(states.shift());
					move();
				});
			
				$ele.find('.zy-next').click(function() {
					next();
				});
			
				var pic = setInterval(next, setting.spend);
				$ele.find('section').add(lis).hover(function() {
					clearInterval(pic);
				}, function() {
					pic = setInterval(next, 2500);
				});
		}
	   	//找到要轮播的轮播图的跟标签，调用 slide 方法
	    $.fn.zySlide = function(options){
	    	// this  就是谁调用这个方法就是谁   ele标签数
	     	$(this).each(function(i,ele){
	     		slide(ele,options);
	     	});
	     	// 支持链式调用，有个返回值
	     	return this;
	    }
	   
	})(jQuery)
	//出让$之后，这个是个jquery的入口 这里的jQuery是个实参，是调用方法的，并且要在前面的方法中设个形参，这个$于让出的$不一样
/*
 * 用jQuery 封插件的几种写法：
 *   
 * 插件类写法:
 * $.fn.customFun = function(){
 * 	//自定义插件代码
 * }
 * 
 * 用法:
 * $('selector').customFun();
 * 
 * 
 * 工具类写法:
 * $.customFun  =function(){
 * 	//自定义工具类的代码
 * }
 * 
 * 用法:
 *  $.customFun()
 * 
 */
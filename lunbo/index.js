
//jQuery 出让 $ 符号的使用权限(也就是说，从这开始 $ 将不是 jQuery，只能用变量 jquery)
jQuery.noConflict();

// zySlide()只要轮播图的跟标签(任何选择器)
jQuery('.slide').zySlide({spend:3000}).css({
	'backgroundColor':'red'
});

//只显示第三个轮播
jQuery('#slide').zySlide({delay:2000,spend:5000}).css({
	'border':'1px solid blue',
	'backgroundColor':'pink'
});
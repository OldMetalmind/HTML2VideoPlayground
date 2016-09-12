
var content = $("#content"),
		info = $("#info"),
		feature = $("#feature");

TweenLite.set(content, {visibility:"visible"})

//instantiate a TimelineLite
var tl = new TimelineLite();
tl.from(info, 0.5, {scale:.5, autoAlpha:0});
// tl.progress(0)

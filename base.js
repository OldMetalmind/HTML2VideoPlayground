var phantom = require('phantom');
var express = require('express');
var app = express();
// app.use(express.static(__dirname + '/public/'));
var TweenMax = require('gsap');
// var timeline = require('gsap').TimelineLite;


// var TweenLite = gsap.TweenLite;
// var timeline = new TimelineLite();

var _ph, _page;

var frame = 0;
var target_fps = 30;




// app.get('/', function (req, res) {

  // greensock();

  // TweenLite.set(content, {visibility:"visible"});
  phantom.create()
      .then(instance => {
          _ph = instance;
          return _ph.createPage();
      })
      .then(page => {
          _page = page;
          return _page.open('public/index.html');
      })
      .then(status => {
          console.log(status);
          return _page.property();
      })
      .then(content => {

        //_-------------_
        _page.evaluate(function() {

          var target = document.getElementById('info');
          var tl = new TimelineLite({paused:false});
          tl.from(target, 3, {scale:0, x:0, y:0});
          //_page.render('out/frame_1.png', { format: "png" });
        });
        //______________

        _page.render('out/original.png', { format: "png" });


        _page.onLoadFinished = function(status){
            console.log('Status: ' + status);
          };

        // console.log("-----------");
        // var timeline = new TimelineMax({paused: true, onStart:onStartTimeline, onComplete:onCompleteTimeline});
        // // var frames = timeline.totalDuration() * target_fps;
        // var frames = 10;
        // for(var frame = 0; frame < frames; frame++) {
        //     _page.evaluate(function (time) {
        //       console.log(time);
        //       // timeline.pause(time);
        //     });
        //     _page.render('frames/frame_' + frame + '.png', { format: "png" });
        // }
        // console.log("-----------");


        // var feature = _page.evaluate(function() {
        //   // _page.render('out/frame_.png', { format: "png" });
        //
        //   return document.getElementById("feature");
        // });
        console.log("1");
        // var tl = new TimelineLite({paused:true});
        // tl.from(content, 3, {scale:0, x:0, y:0, onComplete:onComplete});
        // tl.resume();
        // tl.progress(0.2);
        // console.log("2");
        // tl.progress(0.9);
        // _page.render('out/frame_2.png', { format: "png" });
        // console.log("3");
        // tl.progress(1);
      })
      .catch(error => {
          console.log(error);
          phInstance.exit();
          process.exit(1);
      });

      // res.sendPage('public/index.html');

// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

function onStartTimeline()
{
  console.log("starting animation");
}

function onCompleteTimeline()
{
  console.log("end animation");
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------



var greensock = function()
{
  var foo = { x: 0 };
  TweenMax.to(foo, 1, { x: 100, onComplete: onComplete });

  function onComplete() {
    console.log("foo.x == ", foo.x); // 100
  }
}




/*
  Animation
*/
// TweenMax.from(info, 5, {scale:.5, autoAlpha:0, onComplete:onComplete});
// function onComplete() {
//     _page.render('out/frame_2.png', { format: "png" });
//     console.log("3"); // 100
//     _page.close();
//     _ph.exit();
//   }

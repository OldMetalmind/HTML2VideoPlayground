// Iam using Greensock js to pause the animation and capture the screenshot
// using phantomjs. unfortyunately gif animation every time restart while
// using page.evaluate for pausing animation. any solution to fix.
var phantom = require('phantom');

// var myVar='';
//  var eventTracker;
//  var i=0;
//  var start_slide=0;
//  var check=new Array('0');
//  var page = require('webpage').create();
//  //page.settings.resourceTimeout100;
//  page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
//  page.clipRect = {
//   top: 0,
//   left: 0,
//   width: 1280,
//   height: 720
//  };
//
//  phantom.onError = function(msg, trace) {
//     var msgStack = ['PHANTOM ERROR: ' + msg];
//     if (trace && trace.length) {
//       msgStack.push('TRACE:');
//       trace.forEach(function(t) {
//         msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.
//         function ? ' (in function ' + t.function +')' : ''));
//       });
//     }
//     phantom.exit(1);
//  };
//  page.onConsoleMessage = function(msg, lineNum, sourceId) {
//    if(msg==0 && check[0]=='0'){ check[0]=i;}
//  };
//  page.onLoadFinished = function (status) {
//    if(status=='success'){
//    /*setTimeout(function() {
//    clearInterval(myVar);
//    phantom.exit();
//    }, 30000);*/
//    }
//  };
//
// page.open('public/index.html',function (status)
// {
//   if(status === 'success')
//   {
//      var defaultValue = 0;
//      setTimeout(function()
//      {
//        console.log('enter');
//        var target_fps = 30;
//        var frames = 6*target_fps;
//        for(var frame = 0;frame<frames;frame++)
//        {
//          page.evaluate(function (time)
//          {
//            pauseAnimationAt(time);
//          }, frame * (1 / target_fps));
//          console.log(frame);
//          page.render('ad_images/458/img_458_1_'+frame+'.jpg', { format: 'jpg',
//          quality: 90 });
//        }
//        //if(frame>=frames)
//        phantom.exit();
//         // Do something after 5 seconds
//      }, 20000);
//      /*var i=0;
//        var frame = 0;
//        var target_fps = 30;
//      myVar = setInterval(function(){
//      page.evaluate(function (time) {
//      pauseAnimationAt(time);
//      }, frame * (1 / target_fps));
//      page.render('ad_images/458/img_458_1_'+frame+'.jpg', { format: 'jpg',
//     quality: 100 });
//      frame++;
//      i++;
//      }, 50);*/
//    } else {
//      console.log(status);
//      phantom.exit();
//    }
//  });


var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return page.open('public/index.html');
    })
    .then(status => {
        console.log(status);

//
        if(status === 'success')
        {
              var defaultValue = 0;
              setTimeout(function()
              {
                console.log('enter');
                var target_fps = 30;
                var frames = 6*target_fps;
                for(var frame = 0;frame<frames;frame++)
                {
                  sitepage.evaluate(function (time)
                  {
                    // pauseAnimationAt(time);
                  }, frame * (1 / target_fps));
                  console.log(frame);
                  sitepage.render('ad_images/458/img_458_1_'+frame+'.jpg', { format: 'jpg',
                  quality: 90 });
                }
                //if(frame>=frames)
                phantom.exit();
                 // Do something after 5 seconds
              }, 20000);
        }
//


        return sitepage.property('content');
    })
    .then(content => {
        console.log(content);
        sitepage.close();
        phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

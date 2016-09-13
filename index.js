var exec = require('child_process').exec;
var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
var padNumbers = 2;

phantom.create()
    .then(instance => {
        phInstance = instance;
        return instance.createPage();
    })
    .then(page => {
        sitepage = page;
        return sitepage.open('public/index.html');
    })
    .then(status => {
        console.log(status);
        return sitepage.property('content');
    })
    .then(content => {
        // console.log(content);

        var defaultValue = 0;
        setTimeout(function()
        {
          console.log("start");
          var frame = 0;
          var target_fps = 30;

          printTotalDurationInSecond();

          // var frames = sitepage.evaluate(function () {
          //     return getTotalDurationInSecond();
          // }) * target_fps;
          var frames = target_fps * 1.5;// (TotalDurationInSeconds)

          console.log("n:"+frames);

          for(var frame = 0;frame<=frames;frame++)
          {
            sitepage.evaluate(function (time)
            {
              pauseAnimationAt(time);
            }, frame * (1 / target_fps));
            sitepage.render('out/frame_'+pad(frame,padNumbers)+'.jpg', { format: 'jpg', quality: 90 });
          }

          printTotalDurationInSecond();

          phInstance.exit();
          sitepage.close();

          createVideo();
          console.log("> end");
        }, 10);
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });


function createVideo() {
  var command = "ffmpeg -framerate 1/5 -i out/frame_%0"+padNumbers+"d.jpg -c:v libx264 -r 30 -pix_fmt yuv420p video/out.mp4";
  exec(command, function callback(error, stdout, stderr) {
    if(error) {
      console.log("> video NOT created");
    }
    else {
      console.log("> video created");
    }
    deleteGeneratedImages();
  });
};

function deleteGeneratedImages() {
  var command = "rm out/frame_*";
  exec(command, function callback(error, stdout, stderr){
    if(error) {
      console.log("> images NOT deleted");
    }
    else {
      console.log("> images deleted");
    }
  });
};

function printTotalDurationInSecond() {
  var tmp = sitepage.evaluate(function () {
      return getTotalDurationInSecond();
  });
  console.log(tmp);
};

function pad(a,b){return([1e15]+a).slice(-b)};

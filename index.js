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
        return sitepage.property('content');
    })
    .then(content => {
        console.log("> start");
        var frame = 0;
        var target_fps = 30;
        var frames = 0;

        sitepage.evaluate(function () {
            return getTotalDurationInSecond();
        }).then(function(duration) {
            frames = duration * target_fps;
            for(var frame = 0;frame<=frames;frame++)
            {
              sitepage.evaluate(function (time)
              {
                pauseAnimationAt(time);
              }, frame * (1 / target_fps));
              sitepage.render('out/frame_'+pad(frame,padNumbers)+'.jpg', { format: 'jpg', quality: 90 });
            }
        });
        phInstance.exit();
        sitepage.close();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });


function createVideo() {
  var command = "ffmpeg -y -r 30 -i out/frame_%0"+padNumbers+"d.jpg -c:v libx264 -r 30 -pix_fmt yuv420p out.mp4";
  exec(command, function callback(error, stdout, stderr) {
    if(error) {
      console.log("> video NOT created");
    }
    else {
      console.log("> video created");
    }
    console.log("> finished");
  });
};

function deleteGeneratedImages() {
  var command = "rm -rf out";
  exec(command, function callback(error, stdout, stderr){
    if(error) {
      console.log("> images NOT deleted");
    }
    else {
      console.log("> images deleted");
    }
  });
};

function pad(a,b){return([1e15]+a).slice(-b)};

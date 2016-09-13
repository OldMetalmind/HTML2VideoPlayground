var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
var padNumbers = 2;

console.log("---------------");
console.log("Creating Frames");
console.log("---------------");

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
            phInstance.exit();
            sitepage.close();
        });
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });


function pad(a,b){return([1e15]+a).slice(-b)};

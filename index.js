var phantom = require('phantom');
var sitepage = null;
var phInstance = null;
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
          // var frames = sitepage.evaluate(function () {
          //     return getTotalDurationInSeconds();
          // }) * target_fps;
          var frames = target_fps * 1.5;// (TotalDurationInSeconds)
          console.log("n:"+frames);

          for(var frame = 0;frame<=frames;frame++)
          {
            // console.log(frame+":"+frames+":"+frame * (1 / target_fps));
            sitepage.evaluate(function (time)
            {
              pauseAnimationAt(time);
            }, frame * (1 / target_fps));
            sitepage.render('out/frame_'+frame+'.jpg', { format: 'jpg', quality: 90 });
          }

          if(frame>=frames)
          {
            console.log("end");
            phInstance.exit();
            sitepage.close();
          }
           // Do something after 5 seconds
        }, 10);

        // phInstance.exit();
    })
    .catch(error => {
        console.log(error);
        phInstance.exit();
    });

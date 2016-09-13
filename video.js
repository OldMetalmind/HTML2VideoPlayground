var exec = require('child_process').exec;
var padNumbers = 2;

console.log("---------------");
console.log("Creating video");
console.log("---------------");
// createVideo();

// function createVideo() {
  var command = "ffmpeg -y -r 30 -i out/frame_%0"+padNumbers+"d.jpg -c:v libx264 -r 30 -pix_fmt yuv420p out.mp4";
  exec(command, function callback(error, stdout, stderr) {
    if(error) {
      console.log("> video NOT created");
    }
    else {
      console.log("> video created");
    }
    // deleteGeneratedImages();
  });
// };

// function deleteGeneratedImages() {
//   var command = "rm -rf out";
//   exec(command, function callback(error, stdout, stderr){
//     if(error) {
//       console.log("> images NOT deleted");
//     }
//     else {
//       console.log("> images deleted");
//     }
//     console.log("> finished");
//   });
// };

function pad(a,b){return([1e15]+a).slice(-b)};

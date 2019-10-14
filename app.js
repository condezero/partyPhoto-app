// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
let shouldFaceUser = true;
let flipBtn = document.querySelector('#flip-btn');
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

let supports = navigator.mediaDevices.getSupportedConstraints();
if( supports['facingMode'] === true ) {
  flipBtn.disabled = false;
}
// Access the device camera and stream to cameraView
function cameraStart() {
  constraints.video = { facingMode: shouldFaceUser ? 'user' : 'environment' }
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
flipBtn.addEventListener('click', function(){
    shouldFaceUser = !shouldFaceUser;
    cameraStart();
  });
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
const el = document.querySelector("#pic_container");


var picCount = 1; // number for selecting the right picture file, as all pictures are named x.jpg
var lastSpawned; // for finding the id of the last picture shown, used for removing or blurring.
var scrollCount;

controlsHelp(); // spawns information about controls

function callToSpawn() {
  spawnImage(picCount);
}

function callToRemove() {
  removeImage(lastSpawned);
}

// Checks if screen has width of less than 700px, which would mean user is on mobile device
var screenWidth = window.matchMedia("(max-width: 900px)")
screenWidth.addListener(mobileChanges());

// does nescessary changes for mobile screen-dimensions
function mobileChanges() {
  if(screenWidth.matches) {
    console.log("ScreenWidth is mobile");
    try{
        document.getComputedStyle(".innerimage").style.width = "50%";
    }catch(e){console.log(e);}
  }
}

// Event-listeners for showing new image
document.getElementById("pic_container").addEventListener('click', callToSpawn);

// scrolling event

// control feed with arrow-keys
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      callToRemove();
      break;
    case 38:
      callToRemove();
      break;
    case 39:
      callToSpawn();
      break;
    case 40:
      callToSpawn();
      break;
  }
}

// event-listeners for scrolling on laptop/pc

// displays the controls for using the site when no image is showing
function controlsHelp() {
  if (picCount <= 1){
      document.getElementById("pic_container").innerHTML = '<p id="instructions">scroll or use the arrow keys to show and hide images</p>';
      document.getElementById("instructions").style.margin = "15% 0%";
  }
  else {
    document.getElementById("instructions").innerHTML = "";
    document.getElementById("instructions").style.margin = "0%";
  }
}


// shows next image
function spawnImage(picNumber) {
  // creates random numbers for positioning of the image within the parent div.

  if (screenWidth.matches) { // if on mobile
    var randomMT = (Math.random() * 60); // pictures spawns all the way down the screen and not only at the top
    var randomML = (Math.random() * 10);
    var randomMR = (Math.random() * 10);
    var randomMB = (Math.random() * 10);
  }
  else {
    var randomMT = (Math.random() * 25);
    var randomML = (Math.random() * 58);
    var randomMR = (Math.random() * 58);
    var randomMB = (Math.random() * 58);
  }


  var img = document.createElement("img");
  img.src = "images/" + picNumber + ".jpg";
  var src = document.querySelector("#pic_container");

  img.style.margin = String(randomMT + "% " + randomMR + "% " + randomMB + "% " + randomML + "% ");
  img.classList.add("innerimage");
  img.id = String("picnr" + picNumber);
  src.appendChild(img);
  lastSpawned = (picNumber - 1); //adds last picture to lastSpawned variable for blurring or removing.
  blurlast();
  picCount++;
  controlsHelp();
  mobileChanges();
}

// hides image currently in focus
function removeImage(picNumber) {
  var src = document.querySelector("#pic_container");
  var ele = document.getElementById(String("picnr" + (lastSpawned + 1)));
  try {
    src.removeChild(ele);
    lastSpawned--;
    picCount--;
    unblurWhenRemove();
    controlsHelp();
  }
  catch(error) {
      return;
  }
}

// blurs images behind the one in focus
function blurlast() {
  var ele = document.getElementById(String("picnr" + lastSpawned));
  try {
    ele.style.filter = "blur(0px) grayscale(100)";
  }
  catch(error) {
    return;
  }
}

 // removes blur-effects when image is in focus
function unblurWhenRemove() {
  var ele = document.getElementById(String("picnr" + (lastSpawned + 1)));
  try {
    ele.style.filter = "blur(0px) grayscale(0)";
  }
  catch(error) {
    return;
  }
}

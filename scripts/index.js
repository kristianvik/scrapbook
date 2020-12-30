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

// checks if screen has width of less than 900px, which would mean user is on mobile device
var screenWidth = window.matchMedia("(max-width: 900px)");
screenWidth.addListener(mobileChanges());

// does nescessary changes for mobile screen-dimensions
function mobileChanges() {
  if (screenWidth.matches) {
    $(".innerimage").css("max-width", "75%");
  }
}

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
  if (picCount <= 1) {
    $("#pic_container").html('<p id="instructions">scroll or use the arrow keys to show and hide images</p>');
    $("#instructions").css("margin", "15% 0%");
  } else {
    $("#instructions").html('');
    $("#instructions").css("margin", "0%");
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
  } else {
    var randomMT = (Math.random() * 25);
    var randomML = (Math.random() * 58);
    var randomMR = (Math.random() * 58);
    var randomMB = (Math.random() * 58);
  }

  // creates image
  var img = $(String("<img id=" + "picnr" + picNumber + ">"));
  img.attr('src', String("images/" + picNumber + ".jpg"));
  img.css("margin", String(randomMT + "% " + randomMR + "% " + randomMB + "% " + randomML + "% "));
  img.addClass("innerimage");
  img.appendTo("#pic_container");

  lastSpawned = (picNumber - 1); //adds last picture to lastSpawned variable for blurring or removing.
  blurlast();
  picCount++;
  controlsHelp();
  mobileChanges();
}

// hides image currently in focus
function removeImage(picNumber) {
  $(String("#picnr" + (lastSpawned + 1))).remove();

  if (picCount > 1) { // prevents picCount and lastSpawned values from going below 0.
    picCount--;
    lastSpawned--;
  }

  unblurWhenRemove();
  controlsHelp(); // spawns information about controls
}

// blurs images behind the one in focus
function blurlast() {
  $(String("#picnr" + lastSpawned)).css("filter", "grayscale(100)");
}

// removes blur-effects when image is in focus
function unblurWhenRemove() {
  $(String("#picnr" + (lastSpawned + 1))).css("filter", "grayscale(0)");
}

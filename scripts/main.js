const el = document.querySelector("#pic_container");

//var scrollCount = 1; // delete this
var picCount = 1;
var lastSpawned;

// event-listeners:

function callToSpawn(){
  spawnImage(picCount);
}

function callToRemove(){
  removeImage(lastSpawned);
}

// Event-listeners for showing new image
document.getElementById("pic_container").addEventListener('click', callToSpawn);

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
};


function spawnImage(picNumber) { // shows next image
  console.log("Spawning image: " + picNumber);
  // creates random numbers for positioning of the image within the parent div.
  var randomML = (Math.random() * 58);
  var randomMR = (Math.random() * 58);
  var randomMT = (Math.random() * 25);
  var randomMB = (Math.random() * 58);

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
  console.log(picCount);
}

function removeImage(picNumber) {
  var src = document.querySelector("#pic_container");
  var ele = document.getElementById(String("picnr" + (lastSpawned+1)));
  try {
      src.removeChild(ele);
      lastSpawned--;
      picCount--;
      console.log("Removing image " + ele)
      unblurWhenRemove();
  }
  catch {
    console.log("No image to remove");
  }
}

function blurlast(){
  var ele = document.getElementById(String("picnr" + lastSpawned));
  try {
        ele.style.filter = "blur(0px) grayscale(100)";
  }
 catch {
    console.log("No image to blur.");
  }
}

function unblurWhenRemove(){
  var ele = document.getElementById(String("picnr" + (lastSpawned + 1)));
  try {
        ele.style.filter = "blur(0px) grayscale(0)";
  }
 catch {
    console.log("No image to unblur.");
  }
}

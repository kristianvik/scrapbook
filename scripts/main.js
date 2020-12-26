const el = document.querySelector("#pic_container");

var scrollCount = 1;
var picCount = 0;
var lastSpawned;

function scrollEvent(event) { // bad event-listener, change in future.
  scrollCount++;
  if (scrollCount % 5 == 0) {
    picCount++;
    spawnImage(picCount);
  }
}

function spawnImage(picNumber) { // shows next image
  console.log("Spawner bilde: " + picNumber);
  // creates random numbers for positioning of the image within the parent div.
  var randomML = (Math.random() * 58);
  var randomMR = (Math.random() * 58);
  var randomMT = (Math.random() * 30);
  var randomMB = (Math.random() * 58);

  var img = document.createElement("img");
  img.src = "images/" + picNumber + ".jpg";
  var src = document.querySelector("#pic_container");

  img.style.margin = String(randomMT + "% " + randomMR + "% " + randomMB + "% " + randomML + "% ");
  img.classList.add("innerimage", String("picnr" + picNumber));
  src.appendChild(img);

  lastSpawned = String("picnr" + picNumber); //adds this picture to the lastSpawned variable for future blurring
  blurlast();
}

function blurlast(){
  var picID = lastSpawned;
  //var ele = document.querySelector(String(".innerImage." + lastSpawned));
  console.log("lastSpawned: " + lastSpawned);
}

//jshint esversion:6
$(document).ready(function() {
  const express = require("express");
  const app = express();

  var picCount = 1; // number for selecting the right picture file, as all pictures are named x.jpg
  var lastSpawned; // for finding the id of the last picture shown, used for removing or blurring.

  controlsHelp(); // spawns information about controls

  // checks if screen has width of less than 900px, which would mean user is on mobile
  var screenWidth = window.matchMedia("(max-width: 900px)");
  screenWidth.addListener(mobileChanges());

  // makes nescessary changes for mobile screen-dimensions
  function mobileChanges() {
    if (screenWidth.matches) {
      $('.innerimage').css("max-width", "75%");
    }
  }

  // control feed with arrow-keys
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
      case 38:
        removeImage(lastSpawned);
        break;
      case 39:
      case 40:
        spawnImage(picCount);
        break;
    }
  };


  // displays the controls for using the site when no image is showing
  function controlsHelp() {
    if (picCount <= 1) {
      $('#pic_container').html('<p id="instructions">use the arrow keys to show and hide images</p>');
      $('#instructions').css("margin", "15% 0%");
    } else {
      $('#instructions').html('');
      $('#instructions').css("margin", "0%");
    }
  }

  // shows next image
  function spawnImage(picNumber) {
    // creates random numbers for positioning of the image within the parent div.

    if (screenWidth.matches) { // if on mobile
      var randomT = (Math.random() * 60); // pictures spawns all the way down the screen and not only at the top
      var randomL = (Math.random() * 10);
    } else {
      var randomT = (Math.random() * 40);
      var randomL = (Math.random() * 70);
    }

    // creates image
    var img = $(String("<img id=" + "picnr" + picNumber + ">"));
    img.attr('src', String("images/" + picNumber + ".jpg"));
    img.css("left", String(randomL + "%"));
    img.css("top", String(randomT + "%"));
    img.addClass("innerimage");
    img.appendTo('#pic_container').hide().fadeIn(200);

    if (!screenWidth.matches) {
      $(String("#picnr" + picNumber)).draggable(); // makes picture draggable when not on mobile
    }

    lastSpawned = (picNumber - 1); //adds last picture to lastSpawned variable for blurring or removing.

    $(String("#picnr" + lastSpawned)).css("filter", "grayscale(100)"); // blurs image below this image

    picCount++;
    controlsHelp();
    mobileChanges();
  }

  // hides image currently in focus
  function removeImage(picNumber) {
    $(String("#picnr" + (lastSpawned + 1))).fadeOut(200, function() {
      $(this).remove();
    });

    if (picCount > 1) { // prevents picCount and lastSpawned values from going below 0.
      picCount--;
      lastSpawned--;
    }
    $(String("#picnr" + (lastSpawned + 1))).css("filter", "grayscale(0)"); // unblurs the now in-focus image
    controlsHelp(); // spawns information about controls
  }

});

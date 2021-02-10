//jshint esversion:6
$(document).ready(function() {

  const imgs = [ // hide me! plans for creating own file with this array, problems with node implementation of ES6 import/export, added to to-do-list.
    {
        'link': '1.jpg',
        'category': 'cars'
      },
      {
        'link': '2.jpg',
        'category': 'architecture'
      },
      {
        'link': '3.jpg',
        'category': 'fashion'
      },
      {
        'link': '4.jpg',
        'category': 'fashion'
      },
      {
        'link': '5.jpg',
        'category': 'cars'
      },
      {
        'link': '6.jpg',
        'category': 'architecture'
      },
      {
        'link': '7.jpg',
        'category': 'cars'
      },
      {
        'link': '8.jpg',
        'category': 'cars'
      },
      {
        'link': '9.jpg',
        'category': 'fashion'
      },
      {
        'link': '10.jpg',
        'category': 'fashion'
      },
      {
        'link': '11.jpg',
        'category': 'cars'
      },
      {
        'link': '12.jpg',
        'category': 'cars'
      },
      {
        'link': '13.jpg',
        'category': 'architecture'
      },
      {
        'link': '14.jpg',
        'category': 'art'
      },
      {
        'link': '15.jpg',
        'category': 'cars'
      },
      {
        'link': '16.jpg',
        'category': 'cars'
      },
      {
        'link': '17.jpg',
        'category': 'cars'
      },
      {
        'link': '18.jpg',
        'category': 'architecture'
      },
      {
        'link': '19.jpg',
        'category': 'cars'
      },
      {
        'link': '20.jpg',
        'category': 'cars'
      },
      {
        'link': '21.jpg',
        'category': 'fashion'
      },
      {
        'link': '22.jpg',
        'category': 'art'
      },
      {
        'link': '23.jpg',
        'category': 'art'
      },
      {
        'link': '24.jpg',
        'category': 'cars'
      },
      {
        'link': '25.jpg',
        'category': 'fashion'
      },
  ];

  // new arrays filtered by category:
  let carImgs = imgs.filter(function(obj) { // cars
    return (obj.category === 'cars');
  });

  let artImgs = imgs.filter(function(obj) { // art
    return (obj.category === 'art');
  });

  let archImgs = imgs.filter(function(obj) { // architecture and furniture design
    return (obj.category === 'arch');
  });

  let fashionImgs = imgs.filter(function(obj) { // fashion 
    return (obj.category === 'fashion');
  });

  // recognize category choice:
  let category = "all";
  let lastCategory = "#allBtn";

  //event listeners for category buttons:
  $('#allBtn').click(function(){ // all
    category = 'all';
    $('#allBtn').addClass("active");
    if (lastCategory != "#allBtn"){
      $(lastCategory).removeClass("active");
    }
    lastCategory = '#allBtn';
  });

  $('#carsBtn').click(function(){ // cars
    category = 'cars';
    $('#carsBtn').addClass("active");
    if (lastCategory != "#carsBtn"){
      $(lastCategory).removeClass("active");
    }
    lastCategory = '#carsBtn';
  });

  $('#archBtn').click(function(){ // architecture and furniture
    category = 'arch';
    $('#archBtn').addClass("active");
    if (lastCategory != "#archBtn"){
      $(lastCategory).removeClass("active");
    }
    lastCategory = '#archBtn';
  });

  $('#artBtn').click(function(){ // art
    category = 'art';
    $('#artBtn').addClass("active");
    if (lastCategory != "#artBtn"){
      $(lastCategory).removeClass("active");
    }
    lastCategory = '#artBtn';
  });

  $('#fashionBtn').click(function(){ // fashion
    category = 'fashion';
    $('#fashionBtn').addClass("active");
    if (lastCategory != "#fashionBtn"){
      $(lastCategory).removeClass("active");
    }
    lastCategory = '#fashionBtn';
  });

  let lastSpawned; // for finding the id of the last picture shown, used for removing or blurring.
  let picCount;

  controlsHelp(); // spawns information about controls

  // checks if screen has width of less than 900px, which would mean user is on mobile
  let screenWidth = window.matchMedia("(max-width: 900px)");
  screenWidth.addListener(mobileChanges());

  // makes nescessary changes for mobile screen-dimensions
  function mobileChanges() {
    if (screenWidth.matches) {
      $('.innerimage').css("max-width", "75%");
    }
  }

  // control feed with arrow-keys, no scrolling event listener yet (so mobile does not work yet)
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


  // image index:
  let imgIndex = 0;

  // shows next image
  function spawnImage(picNumber) {
    
    // creates random numbers for positioning of the image within the parent div.

    if (screenWidth.matches) { // if on mobile
      var randomT = (Math.random() * 50); // pictures spawns all the way down the screen and not only at the top
      var randomL = (Math.random() * 30);
    } else {
      var randomT = (Math.random() * 40);
      var randomL = (Math.random() * 70);
    }

    // creates image

    var img = $(String("<img id=" + "picnr" + picNumber + ">"));
    
    img.attr('src', String("./images/" + imgs[imgIndex].link));
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

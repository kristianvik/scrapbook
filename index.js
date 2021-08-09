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
          'link': 'image-removebg-preview (1).png',
          'category': 'fashion'
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
          'link': 'JBaskiat-title.jpg',
          'category': 'art'
        },
        {
          'link': 's-l1600-e1591895474540.jpg',
          'category': 'art'
        },
        {
          'link': 'b1cd2863a0d1e7f1499d93075c623d76.jpg',
          'category': 'art'
        },
        {
          'link': 'headblowupbig.jpg',
          'category': 'art'
        },
        {
          'link': 'EreOEXyXIAE0BYl.jpg',
          'category': 'fashion'
        },
        {
          'link': 'image-removebg-preview (5).png',
          'category': 'fashion'
        },
        {
          'link': 'hode.png',
          'category': 'art'
        },
        {
          'link': 'sofa.png',
          'category': 'architecture'
        },
        {
          'link': 'chillern.png',
          'category': 'cars'
        },
        {
          'link': 'porsche.png',
          'category': 'cars'
        },
        {
          'link': 'virgil-abloh-paris-landmarks-louis-vuitton-fall-winter-collection-architecture_dezeen_2364_col_0-852x1226.jpg',
          'category': 'fashion'
        },
        {
          'link': 'IMG_7710.jpg',
          'category': 'architecture'
        },
        {
          'link': 'image-removebg-preview.png',
          'category': 'fashion'
        },
        {
          'link': 'u4jv02gq36d11.png',
          'category': 'art'
        },
        {
          'link': '133534-7.jpg',
          'category': 'art'
        },
        {
          'link': 'Screenshot 2021-02-11 at 14.27.34.png',
          'category': 'fashion'
        },
        {
          'link': 'Screenshot 2021-02-11 at 14.49.30.png',
          'category': 'fashion'
        },
        {
          'link': 'Screenshot 2021-02-11 at 14.51.17.png',
          'category': 'fashion'
        },
        {
          'link': 'Screenshot_2021-02-11_at_14.46.30-removebg-preview-removebg-preview.png',
          'category': 'fashion'
        },
        {
          'link': 'image-removebg-preview (3).png',
          'category': 'fashion'
        }
        
    ];
  
    // new arrays filtered by category:
    const artImgs = imgs.filter((img) => img.category === 'art');
    const carImgs = imgs.filter((img) => img.category === 'cars');
    const fashionImgs = imgs.filter((img) => img.category === 'fashion');
    const archImgs = imgs.filter((img) => img.category === 'architecture');
  
    // category choice:
    let category = "all";
    let lastCategory = "#allBtn";

    $('.pictures').click(function(){
        spawnImage();
    });
  
    //event listeners for category buttons:
    $('#allBtn').click(function(){ // all
      category = 'all';
      $('#allBtn').addClass("active");
      if (lastCategory != "#allBtn"){
        $(lastCategory).removeClass("active");
      }
      lastCategory = '#allBtn';
      removeAllImages();
    });
  
    $('#carsBtn').click(function(){ // cars
      category = 'cars';
      $('#carsBtn').addClass("active");
      if (lastCategory != "#carsBtn"){
        $(lastCategory).removeClass("active");
      }
      lastCategory = '#carsBtn';
      removeAllImages();
    });
  
    $('#archBtn').click(function(){ // architecture and furniture
      category = 'arch';
      $('#archBtn').addClass("active");
      if (lastCategory != "#archBtn"){
        $(lastCategory).removeClass("active");
      }
      lastCategory = '#archBtn';
      removeAllImages();
    });
  
    $('#artBtn').click(function(){ // art
      category = 'art';
      $('#artBtn').addClass("active");
      if (lastCategory != "#artBtn"){
        $(lastCategory).removeClass("active");
      }
      lastCategory = '#artBtn';
      removeAllImages();
    });
  
    $('#fashionBtn').click(function(){ // fashion
      category = 'fashion';
      $('#fashionBtn').addClass("active");
      if (lastCategory != "#fashionBtn"){
        $(lastCategory).removeClass("active");
      }
      lastCategory = '#fashionBtn';
      removeAllImages();
    });
  
    let lastSpawned = 0; // for finding the id of the last picture shown, used for removing or blurring.
    let imgIndex = 1; // for finding image in img-array.
  
    // checks if screen has width of less than 900px, which would mean user is on mobile
    let screenWidth = window.matchMedia("(max-width: 900px)");
    screenWidth.addListener(mobileChanges());
  
    // makes nescessary changes for mobile screen-dimensions
    function mobileChanges() {
      if (screenWidth.matches) {
        console.log("Screenwidth is matching.")
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
          spawnImage();
          break;
      }
    };


  
    controlsHelp(); // spawns information about controls
  
    // displays the controls for using the site when no image is showing
    function controlsHelp() {
      if (imgIndex <= 1) {
        if (screenWidth.matches){
          $('#pic_container').html('<p id="instructions">tap to show images</p>');
        $('#instructions').css("margin", "15% 0%");
        } else {
          $('#pic_container').html('<p id="instructions">use the arrow keys to show and hide images</p>');
          $('#instructions').css("margin", "15% 0%");
        }
      } else {
        $('#instructions').html('');
        $('#instructions').css("margin", "0%");
      }
    }
  
    // shows next image
    function spawnImage() {
      
      // creates random numbers for positioning of the image within the parent div (picContainer).
      if (screenWidth.matches) { // if on mobile
        var randomT = (Math.random() * 50); // pictures spawns all the way down the screen and not only at the top
        var randomL = (Math.random() * 30);
      } else {
        console.log("screenwidth does not match!")
        var randomT = (Math.random() * 40);
        var randomL = (Math.random() * 70);
      }
  
      // creates image
      var img = $(String("<img id=" + "picnr" + imgIndex + ">"));
  
      if (category === 'art'){
        img.attr('src', String("./images/" + artImgs[imgIndex].link));
      } else if (category === 'cars'){
        img.attr('src', String("./images/" + carImgs[imgIndex].link));
      } else if (category === 'fashion'){
        img.attr('src', String("./images/" + fashionImgs[imgIndex].link));
      } else if (category === 'arch'){
        img.attr('src', String("./images/" + archImgs[imgIndex].link));
      } else {
        img.attr('src', String("./images/" + imgs[imgIndex].link));
      }
    
      img.css("left", String(randomL + "%"));
      img.css("top", String(randomT + "%"));
      img.addClass("innerimage");
      img.appendTo('#pic_container').hide().fadeIn(200);
  
      if (!screenWidth.matches) {
        $(String("#picnr" + imgIndex)).draggable(); // makes picture draggable when not on mobile
      }
  
      lastSpawned = (imgIndex - 1); //adds last picture to lastSpawned variable for blurring or removing.
      $(String("#picnr" + lastSpawned)).css("filter", "grayscale(100)"); // blurs image below this image
  
      imgIndex++;
      controlsHelp();
      mobileChanges();
    }
  
    // hides image currently in focus
    function removeImage() {
      $(String("#picnr" + (lastSpawned + 1))).fadeOut(200, function() {
        $(this).remove();
      });
  
      if (imgIndex > 1) { // prevents imgIndex and lastSpawned values from going below 0.
        imgIndex--;
        lastSpawned--;
      }
      $(String("#picnr" + (lastSpawned + 1))).css("filter", "grayscale(0)"); // unblurs the now in-focus image
      controlsHelp(); // spawner info om kontroller
    }
  
    function removeAllImages() {
      let i;
      for (i = 0; i < imgIndex; i++){
        $(String(`#picnr${i}`)).remove();
      }
      imgIndex = 1;
      lastSpawned = 0;
      controlsHelp();
    }
  
  });
  
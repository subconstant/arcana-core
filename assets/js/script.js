const avatar = { total: 7, current: 0 }
const msg = [
  '...'
];

Array.prototype.random = function () { return this[Math.floor((Math.random()*this.length))]; }

function win(url) {
  let height = window.screen.availHeight - 300;
  let width = window.screen.availWidth - 400;
  window.open(url + '?pop', '_blank', 'toolbar=no,location=no,menubar=no,top=150,left=200,width=' + width + ',height=' + height);
}

function switchavatar() { // unused
  avatar.current < avatar.total ? avatar.current = avatar.current +1
                                : avatar.current = 1;

  $('#avatar').css("background-image","url('/assets/img/avatar/alt/"+avatar.current+".png')")
              .delay(200)
              .queue(function (next) {
                $(this).css("background-image","url('/assets/img/avatar/"+avatar.current+".png')");
                next();
              });
}

const images = document.querySelectorAll('#bgholder img');
const fadeInTime = 1000;
const displayTime = 8000;
const fadeOutTime = 1000;

function getRandomImage() {
  let weightedImages = [];

  images.forEach(image => {
    if (image.classList.contains('bg')) {
      weightedImages.push(image, image, image, image);
    } else if (image.classList.contains('bg_alt')) {
      weightedImages.push(image);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedImages.length);
  return weightedImages[randomIndex];
}

function showRandomImage() {
  const randomImage = getRandomImage();

  randomImage.classList.add('active');

  setTimeout(() => {
    randomImage.classList.remove('active');
  }, displayTime);
  setTimeout(showRandomImage, displayTime + fadeOutTime);
}


$(document).ready(function () {
  if (window.matchMedia("(max-width: 1000px)").matches) {
    $('.postcontent').find('*').removeAttr('style');
  }

  $('#backlink').attr('href', document.referrer);

  if (window.menubar.visible) {
    let url = new URL(location);
    url.searchParams.delete('pop');
    history.replaceState(null, null, url);
  }

  if (window.location.search.includes('?pop')) {
    document.getElementById('postlogo').style.display = 'none';
  }

  if (window.location.search.includes('?sub')) {
    if (document.referrer.includes(window.location.host)) {
      document.getElementById('backlink').style.display = 'inline';
    }

    if (document.referrer.includes('?pop')) {
      document.getElementById('postlogo').style.display = 'none';
    }
  }

  $(".postcontent img").each(function (index, element) {
    $(element).wrap("<div class='postimg'></div>");
  });

  if ($('#avatar').length) {
    avatar.current = Math.floor(Math.random() * avatar.total) + 1;
    $('#avatar').css("background-image","url('/assets/img/avatar/"
                    +avatar.current+
                    ".png')");

    $('#transmission')[0].innerHTML = msg.random();
  };

  if ($('#bgholder').length){
    setTimeout(showRandomImage,1500);
  }
});

if ($('.postitem').length) {
  document.querySelectorAll('.postitem').forEach(function(item){
    item.onmouseover = function(e){
      $('#previewimg')[0].src = item.dataset.preview;
      $('#postpreview')[0].style.display = 'block';
    };

    item.onmousemove = function(e){
      $('#postpreview')[0].style.left = e.clientX + 'px';
      $('#postpreview')[0].style.top = e.clientY + 'px';
    };

    item.onmouseleave = function(e){
      $('#postpreview')[0].style.display = 'none';
    };
  });
}

window.onscroll = function () {
  if ($('#postinfo').length) {
    if (window.scrollY >= 20) {
      $('#postinfo')[0].style.opacity = '0'
      $('#postinfo')[0].style.pointerEvents = 'none'
    } else {
      $('#postinfo')[0].style.opacity = '1'
      $('#postinfo')[0].style.pointerEvents = 'all'
    }
  }
}

//threejs
/*
const threecontainer = document.getElementById('three');
console.log(threecontainer.dataset.file);*/

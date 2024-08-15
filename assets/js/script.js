const domain = '127.0.0.1' //! change once deployed with domain!

function win(url) {
  /*new WinBox({
      title: title,
      url: url
  });*/
  let height = window.screen.availHeight - 300;
  let width = window.screen.availWidth - 400;

  window.open(url + '?pop', '_blank', 'toolbar=no,location=no,menubar=no,top=150,left=200,width=' + width + ',height=' + height);
}

$(document).ready(function () {

  $('#backlink').attr('href', document.referrer);

  // Below IFs configure visibility of logo and back button 
  if (window.menubar.visible) {
    let url = new URL(location);
    url.searchParams.delete('pop');
    history.replaceState(null, null, url)
  }

  if (window.location.search.includes('?pop')) {
    document.getElementById('postlogo').style.display = 'none';
  }

  if (window.location.search.includes('?sub')) {

    if (document.referrer.includes(domain)) {
      document.getElementById('backlink').style.display = 'inline';
    }

    if (document.referrer.includes('?pop')) {
      document.getElementById('postlogo').style.display = 'none';
    }

  }

  $(".postcontent img").each(function (index, element) {
    $(element).wrap("<div class='postimg'></div>");
  });

});

const previmg = document.getElementById('previewimg');
const prev = document.getElementById('postpreview');

document.querySelectorAll('.smallpost').forEach(function(item){
  
  item.onmouseover = function(e){
    previmg.src = item.dataset.preview;
    prev.style.display = 'block';
  };

  item.onmousemove = function(e){
    prev.style.left = e.clientX + 'px';
    prev.style.top = e.clientY + 'px';
  };

  item.onmouseleave = function(e){
    prev.style.display = 'none';
  };
});

window.onscroll = function () {
  if (window.scrollY >= 20) {
    document.getElementById('postinfo').style.opacity = '0'
    document.getElementById('postinfo').style.pointerEvents = 'none'
  } else {
    document.getElementById('postinfo').style.opacity = '1'
    document.getElementById('postinfo').style.pointerEvents = 'all'
  }
}

const images = document.querySelectorAll('#bgholder img');
const fadeInTime = 1000;
const displayTime = 8000;
const fadeOutTime = 1000;

function getRandomImage() {
  let weightedImages = [];

  images.forEach(image => {
    if (image.classList.contains('bg')) {
      // Give 'bg' images a higher weight (e.g., 4x more likely)
      weightedImages.push(image, image, image, image);
    } else if (image.classList.contains('bg_alt')) {
      // Give 'bg_alt' images a lower weight (e.g., 1x)
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

setTimeout(showRandomImage,1500);

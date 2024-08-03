const domain = '127.0.0.1'

function win(url){
    /*new WinBox({
        title: title,
        url: url
    });*/
    let height = window.screen.availHeight-300;
    let width = window.screen.availWidth-400;

    window.open(url + '?pop', '_blank', 'toolbar=no,location=no,menubar=no,top=150,left=200,width=' + width + ',height=' + height);
}

$(document).ready(function(){

    $('#backlink').attr('href', document.referrer);

    // Below IFs configure visibility of logo and back button 
    if(window.menubar.visible){
        let url = new URL(location);
        url.searchParams.delete('pop');
        history.replaceState(null, null, url)
    }

    if(window.location.search.includes('?pop')){
        document.getElementById('postlogo').style.display = 'none';
    }

    if(window.location.search.includes('?sub')){

        if(document.referrer.includes(domain)){
            document.getElementById('backlink').style.display = 'inline';   
        }

        if(document.referrer.includes('?pop')){
            document.getElementById('postlogo').style.display = 'none';
        }

    }


    $(".postcontent img").each(function(index, element) {
        $(element).wrap("<div class='postimg'></div>");
    });

});

document.addEventListener('mousemove', preview, false);

function preview() {

    for (var i=$('.postpreview').length; i--;) {
        $('.postpreview')[i].style.left = event.clientX + 'px';
        $('.postpreview')[i].style.top = event.clientY + 'px';
    }

}

window.onscroll = function() {
var appear = 20
if (window.pageYOffset >= appear) {
  document.getElementById('postinfo').style.opacity = '0'
  document.getElementById('postinfo').style.pointerEvents = 'none'
} else {
  document.getElementById('postinfo').style.opacity = '1'
  document.getElementById('postinfo').style.pointerEvents = 'all'
  
}
}
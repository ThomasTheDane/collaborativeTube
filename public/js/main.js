$(document).ready(function() {

  console.log(window.location.pathname);

  if(window.location.pathname.substr(0,5) == "/room"){
    console.log('room js');

    var youtubePlayer = "sdf";

    function onYouTubePlayerAPIReady() {
      youtubePlayer = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: '',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
    }
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if(event.data === 0) {
        //video is over
      }
    }

    function onPlayerError(event){

    }
  }
});

$(document).ready(function() {
  //room js
  console.log('loaded main.js');
  var videoArea = _.template(
    "<div class='videoInfoArea'>" +
      "<div class='col-xs-2'>" +
        "<img src='http://img.youtube.com/vi/<%- videoId %>/2.jpg' class='videoInfoThumbnail' />" +
      "</div>" +
      "<div class='col-xs-10 videoInfoTextArea'>" +
        "<div class='row videoInfoTitle'>" +
          "<%- videoTitle %>" +
        "</div>" +
        "<div class='row videoInfoAuthor'>" +
          "By <%- videoAuthor %>" +
        "</div>" +
        "<div class='row videoInfo" +
      "</div>" +
    "</div>"
  );

  $('#addVideoButton').click(function(e){
    var url = $('#addVideoTextfield').val().split('v=')[1];

    //add to firebase
    if(roomVideosRef){
      roomVideosRef.push(url);
    }else{
      alert("Problem connecting to room, I'm sorry");
    }
  });

  if(roomVideosRef){
    listenToFire();
  }else{
    window.setTimeout(listenToFire, 1000);
  }
  function listenToFire(){
    console.log('listen to fire');
    roomVideosRef.on('child_added', function(snapshot){
      var url = snapshot.val();
      $.get('http://gdata.youtube.com/feeds/api/videos/' + url, function (reply, status){
        var title = $(reply).find('title').text();
        title = title.substring(0, title.length/2);
        var author = $(reply).find('author').text().split('http://')[0];
        $('#playlistArea').append(videoArea({videoId: url,videoTitle: title, videoAuthor: author}));
        $('#addVideoTextfield').val('');
      });
    });
  }
});

$(document).ready(function() {
  //room js
  console.log('loaded main.js');
  var videoArea = _.template(
    "<div class='videoInfoArea'>" +
      "<div class='col-xs-2'>" +
        "<img src='<%- videoThumbnailUrl %>' class='videoInfoThumbnail' />" +
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
    $('#playlistArea').append(videoArea({videoThumbnailUrl: "https://i1.ytimg.com/vi_webp/OQAPGmHunJc/mqdefault.webp",videoTitle: "dickBUTT Butt with dicks dickbutt", videoAuthor: "just dickbutt"}));
  });
});

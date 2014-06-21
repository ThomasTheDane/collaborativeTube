exports.findRoom = function(req, res){
  res.render('findRoom', {
    title: 'Find A Room'
  });
};

exports.getRoom = function(req, res){
  var roomName = req.params.roomName;
  res.render('room', {
    title: roomName,
    roomName: roomName
  });
};

exports.redirectToRoom = function(req, res){
  return res.redirect('/room/' + req.body.roomName);
};


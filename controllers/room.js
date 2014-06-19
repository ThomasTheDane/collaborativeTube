exports.findRoom = function(req, res){
  res.render('findRoom', {
    title: 'Find A Room'
  });
};

exports.getRoom = function(req, res){

};

exports.redirectToRoom = function(req, res){
  return res.redirect('/room/' + req.body.roomName);
};


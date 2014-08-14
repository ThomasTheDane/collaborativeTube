var Firebase = require('firebase');
var secrets = require('../config/secrets');

exports.newRoom = function(req, res) {
  res.render('newRoom', {
    title: 'New Room'
  });
};

exports.postNewRoom = function(req, res){
  req.assert('roomName', 'Name cannot be blank').notEmpty();

  var name = req.body.roomName.toLowerCase();
  var adminPass = req.body.adminPass || null;
  var creator = req.body.creator || "Anonymous";
  var creatorId = req.body.creatorId;
  var orphan = (creator == "Anonymous");

  var description = req.body.roomDescription;
  var publicCanSeeCreator = (req.body.publicCanSeeCreator == "on") || false;
  var publicCanAdd = req.body.publicCanAdd == "on";
  var publicCanDelete = req.body.publicCanDelete == "on";
  var publicShowcase = req.body.showRoomPublicly == "on";

  var roomsRef = new Firebase('https://ourtube.firebaseIO.com/rooms/' + name);
  roomsRef.auth(secrets.firebaseSecret);
  //listen to see if room already exists
  roomsRef.once('value', function(data){
    console.log('pong off firebase');
    if(data.val() == null){
      roomsRef.set(
//        {orphan: orphan, adminPass: adminPass, creator:creator, permission:{} description: description, publicCanSeeCreator:publicCanSeeCreator, publicCanAdd: publicCanAdd, publicCanDelete: publicCanDelete,  date: (new Date).toDateString(), time: (new Date).toTimeString()},
        function(error) {
          var roomList = new Firebase('https://ourtube.firebaseIO.com/roomList');
          if(publicShowcase){
            roomList.child('public').push(name);
          }else{
            roomList.child('private').push(name);
          }
        }
      );
    }else{
      console.log('room already exists');
      req.assert('', 'Room already exists, please pick a different name').notEmpty();
    }

    var errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/newRoom');
    }

    return res.redirect('/room/'+name);

  }, function(err){
    req.assert('', 'There was a problem connecting and the room was not created. Our deepest apologies, please try again later').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/newRoom');
    }
  });
};
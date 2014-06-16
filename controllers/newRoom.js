var secrets = require('../config/secrets');
var Firebase = require('firebase');
//var nodemailer = require("nodemailer");
//var smtpTransport = nodemailer.createTransport('SMTP', {
//  service: 'SendGrid',
//  auth: {
//    user: secrets.sendgrid.user,
//    pass: secrets.sendgrid.password
//  }
//});

/**
 * GET /contact
 * Contact form page.
 */

exports.newRoom = function(req, res) {
  res.render('newRoom', {
    title: 'New Room'
  });
};

exports.postNewRoom = function(req, res){
  req.assert('roomName', 'Name cannot be blank').notEmpty();

  var name = req.body.roomName;
  var adminPass = req.body.adminPass;
  var description = req.body.roomDescription;
  var publicSeeName = req.body.publicSeeName;
  var publicCanAdd = req.body.publicCanAdd;
  var publicCanDelete = req.body.publicCanDelete;
  console.log(name + " " + description + " " + publicSeeName + " " + adminPass+" " +publicCanAdd+" " +publicCanDelete);

  var roomsRef = new Firebase('https://ourtube.firebaseIO.com/rooms/' + name);
  //listen to see if room already exists
  roomsRef.once('value', function(data){
    console.log('pong off firebase');
    if(data.val() == null){
      roomsRef.set({description: description, date: (new Date).toDateString(), time: (new Date).toTimeString()});
    }else{
      console.log('room already exists');
      req.assert('', 'Room already exists, please pick a different name').notEmpty();
    }

    var errors = req.validationErrors();

    if (errors) {
      req.flash('errors', errors);
      return res.redirect('/newRoom');
    }

    console.log('redirecting after creating room');
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

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param name
 * @param message
 */

//exports.postContact = function(req, res) {
//  req.assert('name', 'Name cannot be blank').notEmpty();
//  req.assert('email', 'Email is not valid').isEmail();
//  req.assert('message', 'Message cannot be blank').notEmpty();
//
//  var errors = req.validationErrors();
//
//  if (errors) {
//    req.flash('errors', errors);
//    return res.redirect('/contact');
//  }
//
//  var from = req.body.email;
//  var name = req.body.name;
//  var body = req.body.message;
//  var to = 'your@email.com';
//  var subject = 'Contact Form | Hackathon Starter';
//
//  var mailOptions = {
//    to: to,
//    from: from,
//    subject: subject,
//    text: body
//  };
//
////  smtpTransport.sendMail(mailOptions, function(err) {
////    if (err) {
////      req.flash('errors', { msg: err.message });
////      return res.redirect('/contact');
////    }
////    req.flash('success', { msg: 'Email has been sent successfully!' });
////    res.redirect('/contact');
////  });
//};

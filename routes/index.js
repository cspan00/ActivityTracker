require('dotenv').load()
var moment = require('moment')
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');
var fs = require('fs')
var multer = require('multer')
var upload = multer({dest: './'})

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,

});

function Users(){
  return knex('users')
}

function Posts(){
  return knex('posts')
}

function Comments(){
  return knex('comments')
}

function Kids(){
  return knex('kids')
}




function createToken(user){
  return jwt.sign(user, process.env.TOKEN_SECRET)
}
function verifyToken(user){
  return jwt.verify(user, process.env.TOKEN_SECRET)
}


//Satellizer route that authenticates the user and logs them in.
router.post('/auth/facebook', function(req,res){
  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
  code: req.body.code,
  client_id: req.body.clientId,
  client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  redirect_uri: req.body.redirectUri
 };
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          var user = {}
          user.facebook_id = profile.id
          user.profile_image_url = 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
          user.email = profile.email
          user.first_name = profile.first_name
          user.last_name = profile.last_name
          user.name = profile.name;
          user.total_hours = 0;
          user.time = new Date();
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              res.redirect('/feed')
            })

      })
    });
})

//Gets and and allows us to display all posts
router.get('/posts', function(req,res,next){
  Posts().select().then(function(response){
    res.send(response)

  })

})
//Verify User Logged in: getting user information
router.post('/user', function(req, res){
  var token = req.body.token
  var user = verifyToken(token)
  Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
  })

})

router.get('/user/:id', function(req, res, next){
  Users().where('facebook_id', req.params.id).first().then(function(response){
    res.send(response)
  })
})

//Adding posts
router.post('/new/post', upload.single('file'), function(req, res, next){
  console.log(req.body);
  cloudinary.uploader.upload(req.file.filename, function(result) {
  var post ={}
  post.facebook_id = req.body.facebook_id
  post.author = req.body.author
  post.author_pic = req.body.author_pic
  post.title = req.body.title
  post.author = req.body.author
  post.description = req.body.description
  post.picture_url = result.secure_url
  post.hours = req.body.hours
  post.time = new Date();
  post.location = req.body.city + ", " + req.body.state



  //update total number of hours for user when they make a post
  //does math to calculate total hours for user.
  Users().where('facebook_id', req.body.facebook_id).first().then(function(result){
    var old_hours = result.total_hours;
    var hours = req.body.hours;
    var new_hours = parseFloat(old_hours) + parseFloat(hours);
    Users().where('facebook_id', result.facebook_id).update('total_hours', new_hours).then(function(result){
    })
  })
  // check to see if more than one kid is selected then update total hours accordingly.
  if(typeof req.body.kids === "object"){
    req.body.kids.forEach(function(elem, i){
      Kids().where('id', elem).first().then(function(result){
        var old_kid_hours = result.total_hours;
        var kid_hours = req.body.hours;
        var new_hours = parseFloat(old_kid_hours) + parseFloat(kid_hours);
          Kids().where('id', result.id).update('total_hours', new_hours).then(function(result){
          })
      })
    })
  }
  else{
    Kids().where('id', req.body.kids).first().then(function(result){
      post.kid_1 = req.body.kids
      var old_kid_hours = result.total_hours;
      var kid_hours = req.body.hours;
      var new_hours = parseFloat(old_kid_hours) + parseFloat(kid_hours);
        Kids().where('id', result.id).update('total_hours', new_hours).then(function(result){
        })
    })
  }

  Posts().insert(post).then(function(result){
      res.redirect('/#/feed')
    })
    fs.unlink('./'+req.file.filename)
 })
})

//Show posts on the profile for user you have selected.
router.post('/getposts', function(req, res, next){
  Posts().where('facebook_id', req.body.facebook_id).then(function(response){
    res.send(response)
    })
  })



router.post('/post/edit', function (req, res, next) {
  Posts().where("id", req.body.postId).update({
    title: req.body.title,
    address: req.body.location,
    description: req.body.description
  }).then(function (response) {
    res.redirect('/#/feed')
  })

})

router.get('/post/:id', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(response){
    res.send(response);
    })
})



// Deletes post and subtracts hours from users total score
router.get('/post/:id/delete', function (req, res, next) {
  var hours;
  var post_id
  Posts().where('id', req.params.id).first().then(function (response) {
      var hours = response.hours;
      var post_id = response.id;
    Users().where('facebook_id', response.facebook_id).first().then(function(response){
        var total_hours = response.total_hours;
        var new_hours = parseFloat(total_hours) - parseFloat(hours);
          Users().where('facebook_id', response.facebook_id).update('total_hours', new_hours).then(function(result){
            res.send(200)
              Posts().where('id', post_id).first().del().then(function(response){
                res.send(200)
              })
          })
    })
  })
})

router.post('/new/kid', upload.single('file'), function (req, res, next){
    var kid = {};
    kid.kid_pic = req.body.kid_pic;
    kid.kid_name = req.body.kid_name;
    kid.facebook_id = req.body.facebook_id;
    kid.total_hours = req.body.total_hours;
    Kids().insert(kid).then(function(result){
      res.redirect('/#/profile')
    })
  })


router.get('/kids/:id', function(req, res, next){
  Kids().where('facebook_id', req.params.id).select().then(function(response){
    res.send(response)
  })
});

router.get('/kids', function(req,res,next){
  Kids().then(function(response){
    res.send(response)
  })
})


module.exports = router;

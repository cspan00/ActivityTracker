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
          user.time = moment().calendar()
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              res.redirect('/posts')
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
    console.log(result);
  })

})

router.get('/user/:id', function(req, res, next){
  Users().where('facebook_id', req.params.id).first().then(function(response){
    res.send(response)
  })
})

//Adding posts
router.post('/new/post', upload.single('file'), function(req, res, next){
cloudinary.uploader.upload(req.file.filename, function(result) {
console.log(result);
var post ={}
post.facebook_id = req.body.facebook_id
post.author = req.body.author
post.author_pic = req.body.author_pic
post.title = req.body.title
post.author = req.body.author
post.address = req.body.location
post.description = req.body.description
post.picture_url = result.secure_url
post.public_id = result.public_id
post.hours = req.body.hours
post.time = moment().calendar()

//update total number of hours for user when they make a post
//does math to calculate total hours for user.
Users().where('facebook_id', req.body.facebook_id).first().then(function(result){
  var old_hours = result.total_hours;
  var hours = req.body.hours;
  var new_hours = parseFloat(old_hours) + parseFloat(hours);
  Users().where('facebook_id', result.facebook_id).update('total_hours', new_hours).then(function(result){
    console.log("hours updated");
  })
})
Posts().insert(post).then(function(result){
  res.redirect('/#/posts')
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

router.get('/dsflksldkjf23423lkdjfvVVslkdjflslss', function(req, res){
  Users().select().then(function(response){
    res.json(response);
  })
})

router.get('/post/:id', function(req,res, next){
  Posts().where('id', req.params.id).first().then(function(response){
    res.send(response);
    })
})
router.get('/post/:id/comments', function(req,res, next){
  Comments().where('post_id', req.params.id).then(function(response){
    res.send(response);
    })
})

router.post('/post/:id/comment', function(req, res, next){
  var comment = {}
  comment.facebook_id = localStorage.satellizer_token
  Comments().insert
})

// Posts().where('id', req.params.id).then(function(response){
//   console.log('THIS IS THE POST WE WANT');
//   console.log(response);
// })

module.exports = router;

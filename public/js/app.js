var app = angular.module("myApp", ['ngRoute', 'ngResource', 'satellizer', 'angularMoment', 'wu.masonry']);


//satellizer oauth config.  This connects facebook oauth to our application.
//production clientId - 976973585702482
// dev client Id -  230855193941767
app.config(function ($routeProvider, $authProvider) {

 $authProvider.facebook({

     clientId: '230855193941767',
     scope: ['email'],
     scopeDelimiter: ',',
     profileFields: ['name', 'id', 'picture.type(large)', 'emails']
   });


 $routeProvider
 .when('/', {
   templateUrl: 'partials/home.html',
 })
 .when('/home', {
   templateUrl: 'partials/home.html',
   controller: 'mainController'
 })
 .when('/feed',{
   templateUrl: 'partials/post/index-new.html',
   controller: 'postController'
 })
 .when('/posts/:id',{
   templateUrl: 'partials/post/show.html',
   controller: 'editController'
 })
 .when('/posts/:id/edit',{
   templateUrl: 'partials/post/edit.html',
   controller: 'editController'
 })
 .when('/newpost',{
   templateUrl: 'partials/post/new.html',
   controller: 'newController'
 })
 .when('/login', {
   templateUrl: 'partials/login.html',
   controller: 'mainController'
 })
 .when('/profile/new',{
  templateUrl: 'partials/profile/new.html',
  controller: 'profileController'
})
 .when('/profile',{
  templateUrl: 'partials/profile/show-new.html',
  controller: 'profileController'
})
 .when('/user/:id', {
   templateUrl: 'partials/profile/show-new-2.html',
   controller: 'profileShowController'
 })


 .when('/new',{
  templateUrl: 'partials/post/new.html',
  controller: 'newController'
})

 .when('/about',{
  templateUrl: 'partials/about.html',
  controller: 'mainController'
})
 .when('/contact',{
  templateUrl: 'partials/contact.html',
  controller: 'mainController'
})
.when('/profile',{
  templateUrl: 'partials/profile/show-new.html',
  controller: 'profileController'
})

.when('/admin', {
  templateUrl: 'partials/admin.html',
  controller: 'postController'
})
.when('/leaderboard', {
  templateUrl: 'partials/scoreboard.html',
  controller: 'leaderBoardController'
})




});

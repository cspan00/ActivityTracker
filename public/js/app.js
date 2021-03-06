var app = angular.module("myApp", ['ngRoute', 'ngResource', 'satellizer', 'wu.masonry']);


//satellizer oauth config.  This connects facebook oauth to our application.
//production clientId - 976973585702482
// dev client Id -  230855193941767
app.config(function ($routeProvider, $authProvider) {

 $authProvider.facebook({

     clientId: '976973585702482',
     scope: ['email'],
     scopeDelimiter: ',',
     profileFields: ['name', 'id', 'picture.type(large)', 'emails']
   });


 $routeProvider
 .when('/', {
   templateUrl: 'partials/home.html',
   controller: 'mainController'
 })
 .when('/home', {
   templateUrl: 'partials/home.html',
   controller: 'mainController'
 })
 .when('/feed',{
   templateUrl: 'partials/post/index-new.html',
   controller: 'postController'
 })
 .when('/profile',{
  templateUrl: 'partials/profile/show-new.html',
  controller: 'profileController'
})
 .when('/user/:id', {
   templateUrl: 'partials/profile/show-new-2.html',
   controller: 'profileShowController'
 })
 .when('/about',{
  templateUrl: 'partials/about.html',
  controller: 'mainController'
})
.when('/profile',{
  templateUrl: 'partials/profile/show-new.html',
  controller: 'profileController'
})
.when('/leaderboard', {
  templateUrl: 'partials/scoreboard.html',
  controller: 'leaderBoardController'
})




});

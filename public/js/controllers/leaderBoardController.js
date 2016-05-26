app.controller('leaderBoardController', function($scope, $rootScope, $location, $auth, posts) {


  posts.getAllKids().then(function(response){
    $scope.kids = response
  })

});

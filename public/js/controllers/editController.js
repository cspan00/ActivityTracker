app.controller("editController", function($scope, $http, $auth, posts, $location, $route, $routeParams){
  var post_id = $routeParams.id
  posts.editPost(post_id).then(function(response){
    $scope.postInfo = response;
    console.log($scope.postInfo);
  })

  $scope.hoursPlus = function(){
    if ($scope.postInfo.hours == 8){

    }
    else{
      $scope.postInfo.hours+= .5
    }
  }
  $scope.hoursMinus = function(){
    if ($scope.postInfo.hours == .5){

    }
    else{
      $scope.postInfo.hours-= .5
    }
  }
})

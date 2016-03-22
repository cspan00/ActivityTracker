app.controller("editController", function($scope, $http, $auth, posts, $location, $route, $routeParams){
  var post_id = $routeParams.id
  posts.editPost(post_id).then(function(response){
    $scope.postInfo = response;
    console.log($scope.postInfo);
  })

  posts.postComments(post_id).then(function(response){
    $scope.comments = response
    console.log($scope.comments)
  })

  posts.getUserData().then(function(result){
    console.log("New Controller");
    console.log(result);
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name
    $scope.facebook_id = result.facebook_id

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

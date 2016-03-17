
app.controller("postController", function($scope, $http, $auth, posts, $location, $route){
  posts.getPosts().then(function(response){
    $scope.posts = response;
  })


  //checks to see if logged in user has is_admin set to true or false, the sets isAdmin to that value
  $scope.userData;
  $scope.isAdmin;
  posts.getUserData().then(function(payload){
    $scope.userData = payload;
    if ($scope.userData['is_admin'] === true) {
    $scope.isAdmin = true;
    } else {
    $scope.isAdmin = false;
    }
  })


  posts.allUser().then(function(result){
    $scope.userStats = result;
    console.log($scope.userStats);

  })
})

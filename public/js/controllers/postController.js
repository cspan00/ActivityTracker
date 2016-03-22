
app.controller("postController", function($scope, $http, $auth, posts, $location, $route){
  posts.getPosts().then(function(response){
    $scope.posts = response;
    $scope.time = response[0].created_at;


  })

  posts.getUserData().then(function (user) {
    $scope.userAdmin = user.is_admin
    $scope.user = user.facebook_id
    console.log($scope.user);
    console.log($scope.userAdmin);
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

  })


posts.showPost().then(function(result){
  $scope.showPost = result;
  console.log("****Showpost****");
  console.log(result);
})

})


app.controller("profileController", function($scope, $http, posts, $location){
  console.log("profileController");
  posts.getUserData().then(function(result){
    $scope.user = result;
      posts.getPostById(result.facebook_id).then(function(result){
        $scope.posts = result;
        console.log($scope.posts);
    })

  })
})

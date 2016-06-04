
app.controller("profileShowController", function($scope, $http, posts, $routeParams, $location){
  console.log("profileShowController");
  var id = $routeParams.id
  posts.getUserById(id).then(function(result){
    $scope.user = result
    posts.getPostById(result.facebook_id).then(function(result){
      $scope.posts = result;
    })
      posts.getKidsByFBId(result.facebook_id).then(function(result){
        console.log(result);
        $scope.kids = result
    })
  })
})

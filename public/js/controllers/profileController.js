
app.controller("profileController", function($scope, $http, posts, $location, $route){
  console.log("profileController");
  posts.getUserData().then(function(result){
    $scope.user = result;
      posts.getPostById(result.facebook_id).then(function(result){
        $scope.posts = result;
        console.log($scope.posts);
    })

  })

  $scope.deletePost = function(){
    return $http.get('post/'+this.post.id+'/delete').then(function(response){
      $route.reload();
    })
  }
})

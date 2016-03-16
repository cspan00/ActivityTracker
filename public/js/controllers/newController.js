app.controller("newController", function($scope, $http, posts){
  posts.getUserData().then(function(result){
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name

  })

  $scope.submitPost = function(){
    posts.getUserData().then(function(result){
      var post = {};
      post.facebook_id = result.facebook_id;
      post.author = result.name;
      post.author_pic = result.profile_image_url;
      post.title = $scope.title;
      post.location = $scope.location;
      post.child_name = $scope.child_name;
      post.description = $scope.description;
      post.picture_url = "null"
      post.hours = $scope.hours
      console.log(post);
      $http.post('new/post', post).then(function(response){
        console.log(response);
        window.location.href = '/#/post';
      })
    })
  }
});

app.controller("editController", function($scope, $http, $auth, posts, $location, $route, $routeParams){
  var post_id = $routeParams.id
  posts.editPost(post_id).then(function(response){
    $scope.postInfo = response;
  })

  posts.postComments(post_id).then(function(response){
    $scope.comments = response
  })

  posts.getUserData().then(function(result){
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name
    $scope.facebook_id = result.facebook_id

  })



})

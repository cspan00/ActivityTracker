app.controller("postController", function($scope, $http, $auth, posts, $location, $route){
var grid = document.querySelector('.grid');
var msnry = new Masonry( grid, {
  // options...
  itemSelector: '.grid-item',
  columnWidth: 200
});
// init with selector
var msnry = new Masonry( '.grid', {
  // options...
});
$scope.hours = 1;
$scope.hoursPlus = function(){
  if ($scope.hours == 8){
  }
  else{
    $scope.hours+= .5
  }
}
$scope.hoursMinus = function(){
  if ($scope.hours == .5){

  }
  else{
    $scope.hours-= .5
  }
}
  posts.getPosts().then(function(response){
    $scope.posts = response;
    $scope.time = response[0].created_at;
  })
  posts.getUserData().then(function (result) {
    $scope.user = result.facebook_id
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name
    $scope.facebook_id = result.facebook_id
      posts.getKidsByFBId(result.facebook_id).then(function(result){
        $scope.kids = result;
      })
  })
  $scope.showCheck = function (){
  $scope.photoSelected = !$scope.photoSelected;
}
  $scope.deletePost = function(){
    return $http.get('post/'+this.post.id+'/delete').then(function(response){
      $route.reload();
    })
  }
  posts.allUser().then(function(result){
    $scope.userStats = result;
  })

})

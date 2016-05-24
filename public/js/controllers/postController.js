app.controller("postController", function($scope, $http, $auth, posts, $location, $route){



  // vanilla JS
// init with element
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


  })

  $scope.deletePost = function(){
    return $http.get('post/'+this.post.id+'/delete').then(function(response){
      $route.reload();
    })
  }

  $scope.addComment = function(){
    var post_id = this.post.id
    var post_comment = this.comment
    posts.getUserData().then(function(user){
    var comment = {}
    comment.comment = post_comment
    comment.facebook_id = user.facebook_id
    comment.post_id = post_id
    $http.post('post/'+post_id+'/comments', comment).then(function(response){
      })
    $route.reload();
  })
}


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

})


app.controller("profileController", function($scope, $http, posts, $location, $route){
  posts.getUserData().then(function(result){
    $scope.user = result;
    $scope.author_name = result.name
    $scope.facebook_id = result.facebook_id
      posts.getPostById(result.facebook_id).then(function(result){
        $scope.posts = result;
    })
    posts.getKidsByFBId(result.facebook_id).then(function(result){
      $scope.kids = result
    })


  })

  $scope.deletePost = function(){
    return $http.get('post/'+this.post.id+'/delete').then(function(response){
      $route.reload();
    })
  }

$scope.showKidForm = function(){
  $scope.kidForm = !$scope.kidForm;
  console.log("clickded");
}

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





})

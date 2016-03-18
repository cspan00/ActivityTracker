app.controller("newController", function($scope, $http, posts){
  posts.getUserData().then(function(result){
    console.log("New Controller");
    console.log(result);
    $scope.author_picture = result.profile_image_url
    $scope.author_name = result.name
    $scope.facebook_id = result.facebook_id

  })

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
//   $scope.submitPost = function(){
//     posts.getUserData().then(function(result){
//       var post = {};
//       post.facebook_id = result.facebook_id;
//       post.author = result.name;
//       post.author_pic = result.profile_image_url;
//       post.title = $scope.title;
//       post.location = $scope.location;
//       post.child_name = $scope.child_name;
//       post.description = $scope.description;
//       post.file = $scope.file
//       post.hours = $scope.hours
//       $http.post('new/post', post).then(function(response){
//         window.location.href = '/#/posts';
//       })
//     })
//   }
// });

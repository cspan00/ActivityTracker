app.controller('mainController', function($scope, $location, $auth) {

   $scope.login = function() {
     $auth.login($scope.user)
       .then(function() {
         console.log('You have successfully signed in!');
         $location.path('/');
       })
       .catch(function(error) {
         console.log(error.data.message, error.status);
       });
   };
   $scope.authenticate = function(provider) {
     $auth.authenticate(provider)
       .then(function(response) {
         console.log('You have successfully signed in with ' + provider + '!');
         console.log(response.data.token);
         $location.path('/post');
       })
       .catch(function(error) {
         if (error.error) {
           // Popup error - invalid redirect_uri, pressed cancel button, etc.
           console.log(error.error);
         } else if (error.data) {
           // HTTP response error from server
         console.log(error.data.message, error.status);
         } else {
           console.log(error);
         }
       });
   };
 });

app.controller("postController", function($scope, $http, userService){
  $scope.isAdmin = false;
  $scope.userData = userService.all().then(function(response) {
    $scope.userData = response;
    if($scope.userData[0]['is_admin'] === false){
      $scope.isAdmin = false;
    } else {
      $scope.isAdmin = true;
    };
  })
});

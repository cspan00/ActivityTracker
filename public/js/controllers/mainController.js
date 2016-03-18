app.controller('mainController', function($scope, $rootScope, $location, $auth) {
  $scope.user = {}
  // $scope.loggedIn = false;
  // $scope.logIn = true;
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
         $location.path('/posts')
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
   $scope.logout = function(){
     $auth.logout()
     console.log("successfully logged out!");
   }
   $rootScope.active = {};
   $rootScope.active.home = true;
   $rootScope.color = {};
   $rootScope.color.home = 'deepskyblue';
   $rootScope.color.about = 'white';

   $rootScope.setNavTab = function(){
     $rootScope.color.about = 'deepskyblue';
     console.log($rootScope.color.about);
     console.log("****WORKING***");
   }




  $scope.logout = function(){
    $auth.logout()
    console.log("successfully logged out!");
  }

  $rootScope.$on('$locationChangeSuccess', function(){
      if(localStorage.satellizer_token){
        // $scope.logIn = false;
        $scope.user.session = true;
      }
      else{

       $scope.user.session = false;
     }

  })
  console.log($scope);
  console.log("Logged in: " + JSON.stringify($scope.user));

 });

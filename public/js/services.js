app.factory('userService', function($http){
  return {
    all: function(){
      return $http.get('/users').then(function(response){
        return response.data
      })
    }
  }
})

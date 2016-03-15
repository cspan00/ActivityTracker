app.factory('userService', function($http){
  return {
    all: function(){
      return $http.get('/post').then(function(response){
        return response.data
      })
    }
  }
})

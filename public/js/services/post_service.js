app.service('posts', function($http){
      this.getPosts = function(){
      return $http.get('posts').then(function(response){
        return response.data
      })
    };


    this.getUserData = function(){

    var token = localStorage.getItem('satellizer_token')
    var data = JSON.stringify({token : token})
      return $http.post('user', data).then(function(response){
      return response.data
      })
    };

    this.getPostById = function(facebook_id){
      var user_info = {}
      user_info.facebook_id = facebook_id
      return $http.post('getposts', user_info).then(function(response){
        return response.data
      })

    }

    this.isLoggedIn = function () {
      var token = localStorage.getItem('satellizer_token')
      return token ? true : false;

    }
    this.getUserById = function(id){
      return $http.get('user/'+ id).then(function(response){
        return response.data
      })
    }

    this.allUser = function (){
      return $http.get('dsflksldkjf23423lkdjfvVVslkdjflslss').then(function(response){
        return response.data
      })
    }

    this.editPost = function (post_id) {
      return $http.get('post/'+ post_id).then(function (response) {
          return response.data
        })
      }

      this.postComments = function (post_id){
        return $http.get('post/' + post_id + '/comments').then(function(comments){
          return comments.data
        })
      }

    this.showPost = function (post_id) {
      return $http.get('post/'+ post_id + '/comments').then(function (response) {
        return response.data
      })
      }

    this.getKidsByFBId = function(facebook_id){
      return $http.get('/kids/'+facebook_id).then(function(response){
        return response.data;
      })
    }
    this.getAllKids = function(){
      return $http.get('/kids').then(function(response){
        return response.data;
      })
    }


})

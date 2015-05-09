'use strict';

angular.module('digg')
.controller('ProfileCtrl', function($scope, User, $state, $window){

  checkProfile();
  $scope.isEdit = false;

  function checkProfile(){
    User.getProfile()
    .then(function(response){
      $scope.user = response.data;
      // if(response.data.avatar){
      //   $scope.user.avatar = '';
      // }
      if(response.data.handle || response.data.email || response.data.avatar || response.data.photo){
        $scope.isEdit = true;
      }
  });
}

  $scope.submit = function(user){
    user.avatar = $scope.avatar;
    User.save(user)
    .then(function(){
      $state.go('home');
    }).catch(function(){
      $window.swal({title: 'Profile Error', text: 'There was a problem saving your profile. Please try again.', type: 'error'});
    });
  };
  
  $scope.previewFile = function() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      $scope.user.photo = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  };

});

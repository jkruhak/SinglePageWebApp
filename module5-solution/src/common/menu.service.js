(function () {
"use strict";

  angular.module('common')
  .service('MenuService', MenuService);

  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    var users = {};
     

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };

    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = {'category': category};
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };



    service.getFavoriteItem = function() {
      return $http({
        method: 'GET',
        url: ApiPath + '/categories.json',
      })
      .then(function(response) {
          
        users = response.data;
        return users;
      });


     
    };

    service.getUserInfo = function(firstname, favorite) {

      return users;
    };

  }

})();
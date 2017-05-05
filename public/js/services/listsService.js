(function() {
  'use strict';

  angular.module('app')
    .service('listsService', service);

  service.$inject = ['$http'];
  function service($http) {
    this.getLists = function() {
      return $http.get('/api/lists')
        .then((res) => {
          return res.data;
        });
    }

    this.postLists = function(list) {
      return $http.get('/api/lists', { list })
        .then((res) => {
          return res.data;
        });
    }

    this.deleteLists = function(listId) {
      return $http.delete(`/api/lists/${listId}`)
        .then((res) => {
          return res.data;
        });
    }
  }
})();

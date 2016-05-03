(function() {
  'use strict';

    angular
        .module('facebookApp')
        .factory('MainFactory', MainFactory);

    MainFactory.$inject = ['$q', '$http', 'api'];

    /* @ngInject */
    function MainFactory($q, $http, api) {
        var accessToken = '';

        var service = {
            getPosts: getPosts
        };

        return service;

        function getPosts(data) {
          var url = data.url || false;
          var deferred = $q.defer();
          if (!url) {
            url = api + data.name + '/posts?fields=picture,message,story,shares,likes.limit(1).summary(true),comments.limit(1).summary(true)&access_token=' + accessToken;
          }

          $http({
            url:url,
            method: 'GET',
          })
          .success(function(response) {
            deferred.resolve(response);
          })
          .error(function(reason) {
            deferred.reject(reason);
          });
          return deferred.promise;
        }
    }
})();

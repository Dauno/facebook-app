(function() {
  'use strict';

    angular
        .module('facebookApp')
        .factory('MainFactory', MainFactory);

    MainFactory.$inject = ['$q', '$http', 'api'];

    /* @ngInject */
    function MainFactory($q, $http, api) {
        var accessToken = 'CAAK3olgSZC5YBAIzhRe858koE04NBZCS02pd27gM1BNW2l50vzZAIWxrZAjYNocWAkyFzzPJKdfca0BZATvLjB57zz4TIhSS1p1uAHZCrqzj5dGMIUQZCNRO1ZAPrZA6QvfdbGwRVFvPcwbnzsfTQV8d7VVJqQFj1GxwATK3u4djlPrRDVWc2K4wp';

        var service = {
            getPosts: getPosts
        };

        return service;

        function getPosts(data) {
          var url = data.url || false;
          if (!url) {
            url = api + data.name + '/posts?access_token=' + accessToken + '&fields=picture,message,story,shares,likes,comments';
          }

          var deferred = $q.defer();
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

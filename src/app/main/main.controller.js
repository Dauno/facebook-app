(function() {
  'use strict';

  angular
    .module('facebookApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(MainFactory) {
    var vm = this,
        nexPage = null;

    angular.extend(vm, {
      pageName: 'PlayGroundMag',
      posts: [],
      load: {
        page: false,
        more: true,
      },
      search: search,
      loadMore: loadMore,
      remove: remove,
      editable: editable
    });

    activate({name: vm.pageName}, function (posts) {
      vm.posts = posts.data;
      nexPage = posts.paging.next;
      vm.load.page = true;
    });

    function activate(data, cb) {
      MainFactory.getPosts(data)
      .then(function(response) {
        cb(response);
      }, function(error) {
        cb(error);
      });
    }

    function search() {
      vm.load.page = false;
      activate({name: vm.pageName}, function (posts) {
        vm.posts = posts.data;
        nexPage = posts.paging.next;
        vm.load.page = true;
      });
    }

    function loadMore() {
      vm.load.more = false;
      activate({url: nexPage}, function (posts) {
        vm.posts = vm.posts.concat(posts.data);
        nexPage = posts.paging.next;
        vm.load.more = true;
      });
    }

    function remove(row) {
      var index = vm.posts.indexOf(row);
      if (index > -1) {
          vm.posts.splice(index, 1);
      }
    }

    function editable(row) {
      var index = vm.posts.indexOf(row);
      if (typeof vm.posts[index].edit === 'undefined') {
        vm.posts[index].edit = true;
      }
      else {
        vm.posts[index].edit = !vm.posts[index].edit;
      }
    }
  }
})();

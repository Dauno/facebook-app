(function() {
  'use strict';

  angular
    .module('facebookApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

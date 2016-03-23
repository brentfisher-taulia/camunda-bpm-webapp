'use strict';

var fs = require('fs');

var template = fs.readFileSync(__dirname + '/deployments.html', 'utf8');

module.exports = [ 'ViewsProvider', function (ViewsProvider) {
  ViewsProvider.registerDefaultView('cockpit.dashboard', {
    id: 'deployments',
    label: 'Deployments',
    template: template,
    pagePath: '#/repository',
    controller: [
      '$scope',
      'camAPI',
    function(
      $scope,
      camAPI
    ) {
      $scope.loadingState = 'LOADING';
      $scope.count = 0;
      var service = camAPI.resource('deployment');
      service.count(function (err, count) {
        if (err) {
          $scope.loadingState = 'ERROR';
          throw err;
        }
        $scope.loadingState = 'LOADED';
        $scope.count = count || 0;
        // $scope.$apply();
      });
    }],

    priority: 0
  });
}];

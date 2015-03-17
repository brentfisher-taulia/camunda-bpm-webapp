/* jshint ignore:start */
'use strict';

var fs = require('fs');

var testHelper = require('../../test-helper');
var setupFile = require('./process-setup');

var dashboardPage = require('../pages/dashboard');
var definitionPage = require('../pages/process-definition');
var instancePage = require('../pages/process-instance');

describe('Cockpit Process Instance Spec', function() {

  describe('diagram interaction', function() {

    before(function() {
      return testHelper(setupFile, function() {
        dashboardPage.navigateToWebapp('Cockpit');
        dashboardPage.authentication.userLogin('admin', 'admin');
        dashboardPage.deployedProcessesList.selectProcess(0);
        definitionPage.table.processInstancesTab.selectProcessInstance(0);
      });
    });

    it('should display process diagram', function() {
      expect(instancePage.diagram.diagramElement().isDisplayed()).to.eventually.be.true;
    });

    it('should display the number of concurrent activities', function() {
      expect(instancePage.diagram.instancesBadgeFor('UserTask_1').getText()).to.eventually.eql('1');
    });

    it('should process clicks in diagram', function() {
      instancePage.diagram.deselectAll();

      expect(instancePage.diagram.isActivitySelected('UserTask_1')).to.eventually.be.false;
      expect(instancePage.instanceTree.isInstanceSelected('User Task 1')).to.eventually.be.false;
    });

    it('should deselect activities in diagram', function() {
      instancePage.instanceTree.selectInstance('User Task 1');

      expect(instancePage.diagram.isActivitySelected('UserTask_1')).to.eventually.be.true;
    });

    it('should reflect the tree view selection in diagram', function() {
      instancePage.instanceTree.deselectInstance('User Task 1');

      expect(instancePage.diagram.isActivitySelected('UserTask_1')).to.eventually.be.false;
    });

  });

});
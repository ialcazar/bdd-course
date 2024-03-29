// Generated by CoffeeScript 1.4.0
(function() {
  var app, appAddress, initTests, loadApp, should, two;

  app = null;

  should = chai.should();

  loadApp = sOn.Testing.Integration.loadTargetWindow;

  appAddress = 'http://localhost:3000/';

  initTests = function(appWin) {
    return app = appWin.BDDApp;
  };

  two = {
    seconds: 2000
  };

  describe("LiveTeamApp: the team productivity application", function() {
    beforeEach(function() {
      return loadApp(appAddress, initTests);
    });
    return describe("the tasks management system", function() {
      return it("counts the time consumed by every task", function() {
        app.startNewTask;
        waits(two.seconds);
        app.finishCurrentTask;
        return app.lastFinishedTask.elapsedSeconds.should.equal(2);
      });
    });
  });

}).call(this);

app = null
should = chai.should()
loadApp = sOn.Testing.Integration.loadTargetWindow
appAddress = 'http://localhost:3000/'
initTests = (appWin) -> 
	app = appWin.BDDApp

two = {seconds: 2000}

describe "LiveTeamApp: the team productivity application", ->
	beforeEach -> 
		loadApp(appAddress, initTests)

	describe "the tasks management system", ->
		it "counts the time consumed by every task", ->
			app.startNewTask
			waits two.seconds
			app.finishCurrentTask
			app.lastFinishedTask.elapsedSeconds.should.equal(2)



		

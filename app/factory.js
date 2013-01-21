var BDD = BDD || {};

(function(BDD, undefined){

	var createApp = function(){
		var app = {
			startUp: function(){
				this.messageWidget = new BDD.Widgets.Message('greeting', $('body'));
				this.messageWidget.show('App started');
			},
			lastFinishedTask: {elapsedSeconds: 0}
		};
		return app;
	}

	BDD.Factory = BDD.Factory || {};
	BDD.Factory.CreateApp = createApp;

}(BDD));
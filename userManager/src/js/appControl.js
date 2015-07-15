var Application = Application || {};


(function(App) {
	'use strict';

	function AppControl() {

	}


	AppControl.prototype.appStart = function() {

		var appModel = new Application.AppModel(),
			appView = new Application.AppView(),
			localStorage = appModel.getDataSaved();

		if (!localStorage) {
			appModel.generateUserData(50);
		}
		appView.appDisplay(appModel.getDataSaved());

	}


	App.AppControl = AppControl;

}(Application));
var Application = Application || {};

(function(App) {
	'use strict';

	function AppView() {

	}

	AppView.prototype.appDisplay = function(userData) {
		var userView;
		for (var i = 0; i < userData.length; i++) {
			userView = new Application.UserView(userData[i].userId, userData[i].userInfor);
			userView.addUserView();
		};
	}

	App.AppView = AppView;

}(Application));
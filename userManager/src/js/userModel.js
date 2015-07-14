var Application = Application || {};

(function(App) {
	'use strict';

	function UserModel(user) {
		this.user = user;
	}

	UserModel.prototype.addUserData = function() {
		var app = new App.AppModule(),
			storage = app.getDataSaved(),
			newUser = new UserModel(this.user);

		storage.push(newUser);
		app.saveData(storage);
	}

	UserModel.prototype.editUserData = function(userId) {

	}

	UserModel.prototype.delUserData = function(userId) {

	}


	App.UserModel = UserModel;

}(Application));
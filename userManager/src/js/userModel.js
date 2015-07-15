/*global _*/

var Application = Application || {};

(function(App) {
	'use strict';

	function UserModel(userId, userInfor) {
		this.userId = userId;
		this.userInfor = userInfor;
	}

	/**
	 * Add user to local storage
	 */
	UserModel.prototype.addUserData = function() {
		var app = new App.AppModule(),
			storage = app.getDataSaved(),
			newUser = new UserModel(this.userID, this.userInfor);

		storage.push(newUser);
		app.saveData(storage);
	}

	/**
	 * Update user in local Storage
	 * @return {array} local Storage
	 */
	UserModel.prototype.editUserData = function() {
		var app = new App.AppModule(),
			storage = app.getDataSaved();

		for (var i = 0; i < storage.length; i++) {

			var userIdGet = storage[i].userId;

			if (userIdGet === this.userId) {
				storage[i].userInfor = this.userInfor;

				app.saveData(storage);
			}
		}
	}

	/**
	 * Delete user in local Storage
	 * @return {array} local Storage
	 */
	UserModel.prototype.delUserData = function(userId) {
		var app = new App.AppModule(),
			storage = app.getDataSaved(),
			index = _.findIndex(storage, function(chr) {
				return chr.userId === userId;
			});
		_.pullAt(storage, index);
	}

	App.UserModel = UserModel;

}(Application));

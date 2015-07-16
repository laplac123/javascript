/*global _,faker*/

var Application = Application || {};

(function(App) {
	'use strict';

	function AppModel(userData) {
		this.userData = userData || [];
	}

	/**
	 * generate random least 50 users and save to localStorage
	 * param {Number} amount
	 */
	AppModel.prototype.generateUserData = function(amount) {
		var app = new AppModel(),
			userData = app.getDataSaved();
		if (!userData || userData.length == 0) {
			userData = _.range(amount).map(function(value) {
				return {
					userId: ++value,
					userInfor: {
						firstName: faker.name.firstName(),
						lastName: faker.name.lastName(),
						address: faker.address.streetAddress()
										+ ', '
										+ faker.address.city()
										+ ' City, '
										+ faker.address.country(),
						email: faker.internet.email(),
						phoneNumber: faker.phone.phoneNumber()
					}
				};
			});
			app.saveData(userData);
		}
	}

	/**
	 * get user data which saved in localStorage
	 * @return {array} [description]
	 */
	AppModel.prototype.getDataSaved = function() {
		return JSON.parse(localStorage.getItem('userManagerData'));
	}

	/**
	 * save user data into local Storage
	 * @param  {array} data 
	 * @return {string} localStorage
	 */
	AppModel.prototype.saveData = function(data) {
		localStorage.setItem('userManagerData', JSON.stringify(data));
	}

	App.AppModel = AppModel;

}(Application));
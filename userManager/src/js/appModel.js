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
		
	}

	/**
	 * get user data which saved in localStorage
	 * @return {array} [description]
	 */
	AppModel.prototype.getDataSaved = function() {
		return JSON.parse(localStorage.getItem('userManagerData'));
	}


	AppModel.prototype.saveData = function(data) {
		localStorage.setItem('userManagerData', JSON.stringify(data));
	}

	App.AppModel = AppModel;

}(Application));
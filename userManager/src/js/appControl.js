/*global _,$*/

var Application = Application || {};


(function(App) {
	'use strict';

	function AppControl() {

	}

	/**
	 * Application initialize
	 * @param  {number} userInitialize initialize database
	 * @return {object}                list user
	 */
	AppControl.prototype.appStart = function(userInitialize) {

		var appModel = new Application.AppModel(),
			appView = new Application.AppView();

		appModel.generateUserData(userInitialize);

		appView.appDisplay(appModel.getDataSaved());

	}

	/**
	 * Refresh application
	 * @return {object} list user
	 */
	AppControl.prototype.appRefreshList = function() {
		var appView = new Application.AppView(),
			appModel = new Application.AppModel();
		appView.appClearListUser();
		appView.appDisplay(appModel.getDataSaved());
	}

	/**
	 * Event search first name of SEARCH BUTTON
	 * @return {object} list user result
	 */
	AppControl.prototype.searchFirstName = function() {
		$('#searchBtn').click(function(event) {
			var result,
				appModel = new Application.AppModel(),
				appView = new Application.AppView(),
				$searchText = $('#searchText').val(),
				searchFName = new RegExp($searchText,'ig'),
				dataUser = appModel.getDataSaved();


			result = _.filter(dataUser, function(user) {
				return searchFName.test(user.userInfor.firstName);
			});	

			appView.appClearListUser();
			appView.appDisplay(result);
		});
	}


	App.AppControl = AppControl;

}(Application));
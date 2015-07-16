var Application = Application || {};

(function(App) {
	'use strict';

	function AppView() {

	}

	/**
	 * Application display when start app
	 * @param  {object} userData user data
	 * @return {object}          list user in th screen
	 */
	AppView.prototype.appDisplay = function(userData) {
		var userView;

		$('#input-userId').text('');
		$('#input-firstName').val('');
		$('#input-lastName').val('');
		$('#input-address').val('');
		$('#input-email').val('');
		$('#input-phoneNumber').val('');

		$('#addBtn').removeClass('hidden');
		$('#editBtn').addClass('hidden');

		for (var i = 0; i < userData.length; i++) {
			userView = new Application.UserView(userData[i].userId, userData[i].userInfor);
			userView.addUserView();
		};
	}

	/**
	 * Clear List user
	 * @return {object} null
	 */
	AppView.prototype.appClearListUser = function() {
		$('#userList tr[data-id]').remove();
	}

	/**
	 * Reset field form
	 * @return {text} null field
	 */
	AppView.prototype.appResetFormView = function() {
		$('#input-userId').text('');
		$('#input-firstName').val('');
		$('#input-lastName').val('');
		$('#input-address').val('');
		$('#input-email').val('');
		$('#input-phoneNumber').val('');

		$('#addBtn').removeClass('hidden');
		$('#editBtn').addClass('hidden');
	}

	App.AppView = AppView;

}(Application));
/*global _,$*/

var Application = Application || {};

(function(App) {
	'use strict';

	function UserControl() {

	}

	/**
	 * Event for ADD BUTTON
	 */
	UserControl.prototype.addUser = function() {
		$('#addBtn').click(function(event) {

			if ($('#input-firstName').val() 
				&& $('#input-lastName').val() 
				&& $('#input-address').val() 
				&& $('#input-email').val()
				&& $('#input-phoneNumber').val()) {
				var userModel,
					userView,
					appModel = new Application.AppModel(),
					userData = appModel.getDataSaved(),
					userLastId = _.last(userData).userId,

					userIdAdd = ++userLastId,
					userInforAdd = {
						firstName: $('#input-firstName').val(),
						lastName: $('#input-lastName').val(),
						address: $('#input-address').val(),
						email: $('#input-email').val(),
						phoneNumber: $('#input-phoneNumber').val()
					};
				userModel = new Application.UserModel(userIdAdd, userInforAdd);
				userView = new Application.UserView(userIdAdd, userInforAdd);
				userModel.addUserData();
				userView.addUserView();
				userView.appResetFormView();
			}
		});
	};

	/**
	 * Event for EDIT BUTTON
	 */
	UserControl.prototype.editUser = function() {
		$('#editBtn').click(function(event) {
			var userModel = new Application.UserModel(),
				appControl = new Application.AppControl(),

				userId = $('#input-userId').text(),
				userInfor = {
					firstName: $('#input-firstName').val(),
					lastName: $('#input-lastName').val(),
					address: $('#input-address').val(),
					email: $('#input-email').val(),
					phoneNumber: $('#input-phoneNumber').val()
				};
			userModel = new Application.UserModel(userId, userInfor);
			userModel.editUserData();
			appControl.appRefreshList();
		});

		$('.info-btn').click(function(event) {
			var userView = new Application.UserView(),
				$userNode = $(this).parents('tr'),
				userId = $userNode.attr('data-id'),
				userInfor = {
					firstName: $userNode.find('.firstName').text(),
					lastName: $userNode.find('.lastName').text(),
					address: $userNode.find('.address').text(),
					email: $userNode.find('.email').text(),
					phoneNumber: $userNode.find('.phoneNumber').text()
				};
			userView = new Application.UserView(userId, userInfor);
			userView.editUserView();

		});
	};

	/**
	 * Event for CANCEL BUTTON
	 */
	UserControl.prototype.cancelUser = function() {
		$('#cancelBtn').click(function(event) {
			var userView = new Application.UserView();

			userView.cancelUserView();
		});

	};

	/**
	 * Event for DELETE BUTTON
	 */
	UserControl.prototype.delUser = function() {
		$('.delete-btn').click(function(event) {
			var userModel = new Application.UserModel(),
				userView = new Application.UserView(),
				$userNode = $(this).parents('tr'),
				userId = $userNode.attr('data-id');

			userModel.delUserData(userId);
			userView.delUserView(userId);
		});
	}

	App.UserControl = UserControl;

}(Application));
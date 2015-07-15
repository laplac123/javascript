/*global _,$*/

var Application = Application || {};

(function(App) {
	'use strict';

	function UserControl() {

	}

	UserControl.prototype.addUser = function() {
		$('#addBtn').click(function(event) {
			event.preventDefault();

			var userModel = new Application.UserModel(),
				userView = new Application.UserView(),
				userData = userModel.getDataSaved(),
				userLastId = _.last(userData).userId,

				userId = userLastId++,
				userInfor = {
					firstName: $('#input-firstName').val(),
					lastName: $('#input-lastName').val(),
					address: $('#input-address').val(),
					email: $('#input-email').val(),
					phoneNumber: $('#input-phoneNumber').val()
				};
			userModel = new Application.UserModel(userId, userInfor);
			userView = new Application.UserView(userId, userInfor);
			userModel.addUserData();
			userView.addUserView();
		});
	}


	UserControl.prototype.editUser = function() {
		$('#editBtn').click(function(event) {
			var userModel = new Application.UserModel(),

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
		});

	}


	UserControl.prototype.delUser = function() {
		$('#delete-btn').click(function(event) {
			var userModel = new Application.UserModel(),
				userView = new Application.UserView(),
				$userNode = $(this).parents('tr'),
				userId = $userNode.attr('data-id');

			userModel.delUserData(userId);
			userView.delUserView(userId);
		});
	}


	UserControl.prototype.infoUser = function() {
		$('#info-btn').click(function(event) {
			var userView = new Application.UserView(),
				$userNode = $(this).parents('tr'),
				userId = $userNode.attr('data-id'),
				userInfor = {
					firstName: $userNode.find('#firstName').val(),
					lastName: $$userNode.find('#lastName').val(),
					address: $userNode.find('#address').val(),
					email: $userNode.find('#email').val(),
					phoneNumber: $userNode.find('#phoneNumber').val()
				};
			userView = new Application.UserView(userId, userInfor);
			userView.editUserView();

		});
	}

	App.UserControl = UserControl;

}(Application));
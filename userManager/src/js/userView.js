/*global $ */


var Application = Application || {};

(function(App) {
	'use strict';

	function UserView(userId, userInfor) {
		this.userId = userId;
		this.userInfor = userInfor;
	}

	/**
	 * add user into User List
	 */
	UserView.prototype.addUserView = function() {
		var userInfor = this.userInfor;

		$('#userList').append('include itemList.jade');
		$('tr').attr('data-id', this.userId);
		$('#userId').text(this.userId);
		$('#firstName').text(userInfor.firstName);
		$('#lastName').text(userInfor.lastName);
		$('#address').text(userInfor.address);
		$('#email').text(userInfor.email);
		$('#phoneNumber').text(userInfor.phoneNumber);
	}

	/**
	 * edit userInfor
	 */
	UserView.prototype.editUserView = function() {
		var userInfor = this.userInfor;

		$('#input-userId').text(this.userId);
		$('#input-firstName').val(userInfor.firstName);
		$('#input-lastName').val(userInfor.lastName);
		$('#input-address').val(userInfor.address);
		$('#input-email').val(userInfor.email);
		$('#input-phoneNumber').val(userInfor.phoneNumber);

		$('#addBtn').addClass('disabled');
		$('#editBtn').removeClass('disabled');
	}

	/**
	 * delete userInfor from User List
	 */
	UserView.prototype.delUserView = function(userId) {
		var $delUser = $('userList').find("[data-id='" + userId + "']");

		$delUser.remove();
	}

	App.UserView = UserView;

}(Application));
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
		var userInfor = this.userInfor,
			$itemList = $('#userList tr:first-child').clone(true).removeClass('hidden').removeAttr('id');

		$('#userList').append($itemList);
		$('tr:nth-child(' + $('#userList').children().length + ')').attr('data-id', this.userId);
		$('tr[data-id=' + this.userId + '] .userId').text(this.userId);
		$('tr[data-id=' + this.userId + '] .firstName').text(userInfor.firstName);
		$('tr[data-id=' + this.userId + '] .lastName').text(userInfor.lastName);
		$('tr[data-id=' + this.userId + '] .address').text(userInfor.address);
		$('tr[data-id=' + this.userId + '] .email').text(userInfor.email);
		$('tr[data-id=' + this.userId + '] .phoneNumber').text(userInfor.phoneNumber);
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

		$('#addBtn').addClass('hidden');
		$('#editBtn').removeClass('hidden');
	}

	UserView.prototype.cancelUserView = function() {
		$('#input-userId').text('');
		$('#input-firstName').val('');
		$('#input-lastName').val('');
		$('#input-address').val('');
		$('#input-email').val('');
		$('#input-phoneNumber').val('');

		$('#addBtn').removeClass('hidden');
		$('#editBtn').addClass('hidden');
	}

	/**
	 * delete userInfor from User List
	 */
	UserView.prototype.delUserView = function(userId) {
		var $delUser = $('#userList').find("[data-id='" + userId + "']");

		$delUser.remove();
	}

	App.UserView = UserView;

}(Application));
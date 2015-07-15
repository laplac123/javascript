var Application = Application || {};

$(document).ready(function() {
	'use strict';

	var app = new Application.AppControl();

	app.appStart();

	var userControl = new Application.UserControl();

	userControl.addUser();
	userControl.editUser();
	userControl.delUser();
	userControl.infoUser();
});
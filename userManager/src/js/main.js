var Application = Application || {};

$(document).ready(function() {
	'use strict';

	var app = new Application.AppControl();

	app.appStart(50);
	app.searchFirstName();

	var userControl = new Application.UserControl();

	userControl.addUser();
	userControl.editUser();
	userControl.cancelUser();
	userControl.delUser();
});
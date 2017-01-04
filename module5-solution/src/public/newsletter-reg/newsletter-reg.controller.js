(function() {
"use strict";

	angular.module('public')
	.controller('NewsletterRegistrationController', NewsletterRegistrationController);

	NewsletterRegistrationController.$inject = ['regForm'];
	function NewsletterRegistrationController(regForm) {
		var registration = this;
		registration.user = regForm;
		
		registration.submit = function() {
			registration.completed = true;

		}
	}

})();
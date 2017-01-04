(function() {
"use strict";

	angular.module('public')
	.controller('NewsletterUserInfoController', NewsletterUserInfoController);

	NewsletterUserInfoController.$inject = ['userInfo'];
	function NewsletterUserInfoController(userInfo) {
		var registeredinfo = this;

		registeredinfo.user = userInfo;
	}

})();
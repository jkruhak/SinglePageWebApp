(function() {
'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService);

	MenuDataService.$inject = []
	function MenuDataService() {
		var service = this;

		service.getAllCategories = function() {

		};

		service.getItemsForCategory = function(categoryShortName) {

		};
	}

}());
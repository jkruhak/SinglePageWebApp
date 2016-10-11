(function() {
'use strict';

	angular.module('MenuApp')
	.controller('ItemsDetailController', ItemsDetailController);

	ItemsDetailController.$inject = ['details']
	function ItemsDetailController(details) {
		var itemDetails = this;

		itemDetails.details = details.menu_items;
		itemDetails.category = details.category.name;
	}

}());
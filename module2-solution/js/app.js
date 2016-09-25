(function() {
'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	// Shopping list controller for items to buy
	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService) {
		var showList = this;

		showList.toBuyItems = ShoppingListCheckOffService.getItems();

		showList.removeItem = function(itemIndex) {
			ShoppingListCheckOffService.removeItem(itemIndex);
		};
	
	};

	// Shopping list controller for items already bought
	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var boughtList = this;

		boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
	};

	function ShoppingListCheckOffService() {
		var service = this;

		// List of items to buy
		var toBuyItems = [
			{
				name: 'cookies',
				quantity: '10'
			},
			{
				name: 'milk',
				quantity: '5'
			},
			{
				name: 'tomatoes',
				quantity: '5'
			},
			{
				name: 'bell peppers',
				quantity: '5'
			},
			{
				name: 'potatoes',
				quantity: '10'
			}
		];

		// List of items already bought
		var boughtItems = [];

		// Remove items from to buy list
		service.removeItem = function(itemIndex) {
			var removed = toBuyItems.splice(itemIndex, 1);
			boughtItems.push(removed);
		};

		// Return list of items to buy
		service.getItems = function() {
			return toBuyItems;
		};

		// Return list of bought items
		service.getBoughtItems = function() {
			return boughtItems;
		};
	};

}());
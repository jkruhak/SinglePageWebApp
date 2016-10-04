(function() {
'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItems)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

	// Found items directive
	function FoundItems() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: NarrowItDownController,
			controllerAs: 'narrowItDown',
			bindToController: true
		};

		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowItDown = this;
		narrowItDown.searchTerm = "";
		narrowItDown.found = [];
		narrowItDown.error = false;

		narrowItDown.logMenuItems = function(searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

			promise.then(function(response) {
				// Get response from Service
				narrowItDown.found = response;
				
				// Check if anything is returned to show error
				if(narrowItDown.found.length === 0) {
					narrowItDown.error = true;
				} else {
					narrowItDown.error = false;
				}
			})
			.catch(function(error) {
				console.log('Something went wrong - ', error);
			})
		};

		narrowItDown.removeItems = function(itemIndex) {
			MenuSearchService.removeItems(itemIndex);
		};
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		var foundItems;

		service.getMatchedMenuItems = function(searchTerm) {
			foundItems = [];

			// API to get full menu from server
			return $http({
				method: 'GET',
				url: (ApiBasePath + '/menu_items.json')
			})

			// Function to limit results to search term
			.then(function(response) {
				var fullMenu = response.data.menu_items;
				searchTerm = searchTerm.toLowerCase();

				// Check if search term is entered
				if(searchTerm.length) {
					// Loop through menu to get searchTerm items
					for(let i = 0; i < fullMenu.length; i++) {
						if(fullMenu[i].name.toLowerCase().indexOf(searchTerm) !== -1 || fullMenu[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
							foundItems.push(fullMenu[i]);
						}
					}
				} 
				
				return foundItems;
			});
		};

		// Remove items from menu
		service.removeItems = function(itemIndex) {
			foundItems.splice(itemIndex, 1);
		};
	}
}());
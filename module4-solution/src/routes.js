(function() {
'use strict';

	angular.module('MenuApp')
	.config(RoutesConfig)
	.run(RunFunction);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {
		//Redirect to home page if no other URL matches
		$urlRouterProvider.otherwise('/');

		// *** Set up UI states ***
		$stateProvider

		// Homepage
		.state('home', {
			url: '/',
			templateUrl: 'src/templates/home.template.html'
		})
		// Categories list
		.state('categories', {
			url: '/categories',
			templateUrl: 'src/templates/categories.template.html',
			controller: 'CategoriesListController as categoryList',
			resolve: {
				items: ['MenuDataService', function(MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})
		// Item details
		.state('items', {
			url: '/items/{shortnameId}',
			templateUrl: 'src/templates/items.template.html',
			controller: 'ItemsDetailController as itemDetails',
			resolve: {
				details: ['$stateParams', 'MenuDataService', 
					function($stateParams, MenuDataService) {
						return MenuDataService.getItemsForCategory($stateParams.shortnameId);
					}
				]
			}
		});
	}

	RunFunction.$inject = ['$rootScope']
    
    function RunFunction($rootScope) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });
    }

}());
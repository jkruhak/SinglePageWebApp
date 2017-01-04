(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.newsletteruserinfo', {
      url: '/newsletter-userinfo',
      templateUrl: 'src/public/newsletter-userinfo/newsletter-userinfo.html',
      controller: 'NewsletterUserInfoController',
      controllerAs: 'userInfoCtrl',
      resolve: {
        userInfo: ['MenuService', function(MenuService) {
          return MenuService.getUserInfo();
        }]
      }
    })
    .state('public.newsletterreg', {
      url: '/newsletter-registration',
      templateUrl: 'src/public/newsletter-reg/newsletter-reg.html',
      controller: 'NewsletterRegistrationController',
      controllerAs: 'regCtrl',
      resolve: {
        regForm: ['MenuService', function(MenuService) {
          return MenuService.getFavoriteItem();
        }]
      }
    });
}
})();

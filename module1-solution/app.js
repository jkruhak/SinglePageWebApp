(function() {
'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.inputItems = '';

		$scope.checkItems = function() {
			// split string
			$scope.arrayItems = $scope.inputItems.split(',');

			// trim whitespace from array elements
			$scope.arrayItems = $scope.arrayItems.filter(function(e) {
				return String(e).trim();
			});
			
			$scope.lengthOfArray = $scope.arrayItems.length;

			if ($scope.lengthOfArray  === 0) {
				$scope.result =  "Please enter data first";
			} else if($scope.lengthOfArray <= '3') {
				$scope.result = "Enjoy!";
			} else if ($scope.lengthOfArray > '3') {
				$scope.result =  "Too much!";
			}  
		};
	}

})();
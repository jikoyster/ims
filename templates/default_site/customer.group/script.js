(function(){
	var customer = angular.module("customer", []);
	customer.controller("customerController", function(){
		this.alert = function(){
			alert("hi");
		};
	});
})();
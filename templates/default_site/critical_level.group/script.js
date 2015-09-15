(function(){
	var cl = angular.module("criticalLevel", []);
	cl.controller("clController", function(){
		this.alert = function(msg){
			alert(msg);
		};
	});

	cl.filter("myNum", function(){
		return function(input){
			newVal = (parseFloat(input.replace(',',''))).toFixed(2);
			return newVal.toLocaleString();
		};
	});
})();
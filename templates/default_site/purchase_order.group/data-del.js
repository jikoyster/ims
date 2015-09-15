(function(){
	var po = angular.module("po", []);
	po.controller("poController", function(){
		this.buttonOn = function(rowId){
							$('#'+rowId).find('.remove-icon').removeClass(delbuttonOff);
							$('#'+rowId).find('.remove-icon').addClass(delbuttonOn);
						};
	
		this.buttonOff = function(rowId){
							$('#'+rowId).find('.remove-icon').removeClass(delbuttonOn);
							$('#'+rowId).find('.remove-icon').addClass(delbuttonOff);
						};

		this.removeData = function(entry_id){
							$('#row-'+entry_id).hide(500, function(){ $(this).remove(); });
							
							$.ajax({
								url: "{path='purchase_order/delete'}/" + entry_id
							})
							.done(function(result){
								alert("Data is disabled successfully.");									
							});
							
						};

		

	});
})();
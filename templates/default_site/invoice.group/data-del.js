(function(){
	var invoice = angular.module('invoice', []);
	invoice.controller('invoiceController', function(){
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
								url: "{path='invoice/delete'}/" + entry_id
							})
							.done(function(result){
								alert("Data is disabled successfully.");									
							});

						};
	});//invoiceController

	invoice.controller("computationController", function(){
		this.compute_tax_amount = function(){
			this.subtotal = this.get_subtotal();	
			this.tax_rate = this.get_tax_rate();
			this.tax_amount = this.subtotal * (this.tax_rate/100);
			// this.set_tax_amount( this.tax_amount );
		};
		this.compute_total_amount = function(){
			// this.subtotal = this.get_subtotal();
			// this.tax_amount = this.get_tax_amount();
			this.total_amount = parseFloat(this.subtotal) + parseFloat(this.tax_amount);
			// this.set_total_amount( this.total_amount );
		};

		this.get_subtotal = function(){ return $('input[name=invoice_subtotal]').val(); };
		this.get_tax_rate = function(){ return $('input[name=invoice_tax_rate]').val(); };
		this.get_tax_amount = function(){ return $('input[name=invoice_tax_amount]').val(); };
		this.get_total_amount = function(){ return $('input[name=invoice_total_amount]').val(); };

		// this.set_tax_amount = function(tax_amount){ $('input[name=invoice_tax_amount]').val( tax_amount.toFixed(2) ); };
		// this.set_total_amount = function(total_amount){ $('input[name=invoice_total_amount]').val( total_amount.toFixed(2) ); };
	});

	invoice.filter('num', function(){
		return function(input){
			return parseFloat( input.replace(',', ''));
		}
	});
})();
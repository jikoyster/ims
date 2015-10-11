(function(){
	var product = angular.module("product", []);
	product.controller("productController", function(){
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
								url: "{path='stocks/delete'}/" + entry_id
							})
							.done(function(result){
								alert("Data is disabled successfully.");									
							});

						};
	});

	product.controller("priceController", function(){
		this.currencySymbol = "\u20B1 ";
		

		this.alert = function(){
			alert('hi');
		};

		this.checkDefault = function(elem){
			switch(elem){
				case 'company_price':
					this.company_price = $('input[name=company_price]').val();
					if(this.company_price == 0){
						$('input[name=company_price]').val('');
					}
					break;
			}
		};

		this.set_prices = function(){
			this.set_net_price();
			this.set_wholesale_price();
			this.set_retail_price();
		};
		
		this.set_net_price = function(){
			less = this.get_less();
			this.company_price = (this.get_company_price()).replace(',', '');
			this.net_price = this.company_price - ((less/100) * this.company_price);
		};
		this.set_custom_net_price = function(custom_price){
			this.net_price = custom_price;
		}

		this.set_wholesale_price = function(){
			wRate = this.get_wholesale_rate();
			this.wholesale_price = this.net_price + ((wRate/100) * this.net_price);
		};
		this.set_retail_price = function(){
			rRate = this.get_retail_rate();
			this.retail_price = this.net_price + ((rRate/100) * this.net_price);
		};

		//GETTERS
		this.get_company_price = function(){
			return $('input[name=company_price]').val();
		};
		this.get_less = function(){
			return $('input[name=less]').val();
		};
		this.get_net_price = function(){
			return $('input[name=net_price]').val();
		};
		this.get_wholesale_rate = function(){
			return $('input[name=wholesale_rate]').val();
		};
		this.get_retail_rate = function(){
			return $('input[name=retail_rate]').val();
		};
	});

	
	product.filter('num', function(){
		return function(input){
			return parseFloat( input.replace(',', '') );
		}
	});

})();
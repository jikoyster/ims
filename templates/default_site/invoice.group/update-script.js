jQuery('#publishForm').submit(function(){
	update_products();
});


var validate_required_fields = function(){

		};

var update_products = function(){
			$ = jQuery.noConflict();
			prod_count = $('.listrow').length;
			for(var i=0; i<prod_count; i++){
				entry_id	= $('.listrow:eq('+i+')').find('.entry_id').text();
				qty 		= $('.listrow:eq('+i+')').find('.qty input').val();
				// console.log( JSON.stringify( entry_id +"::"+ qty ) );
				$.ajax({
					//query the product using 'entry_id' 
					//subtract in_stock using 'qty'
					
					url: "{path='invoice/updateProduct'}/"+ entry_id +"/"+ qty 
				});
			}//for-loop
		};
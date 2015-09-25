$ = jQuery.noConflict();

jQuery('#publishForm').submit(function(){
	
	po_status = $("select[name=po_status]").val();
	switch( po_status ){
		case "PENDING":
			return true;
			break;
		case "RECEIVED":
			update_products();
			return false;
			break;
	}
});


var validate_required_fields = function(){

		};

var update_products = function(){
			
			prod_count = $('.listrow').length;
			
			for(var i=0; i<prod_count; i++){
				entry_id	= $('.listrow:eq('+i+')').find('.entry_id').text();
				qty 		= $('.listrow:eq('+i+')').find('.qty input').val();

				console.log(entry_id+'/'+qty);
				// console.log( JSON.stringify( entry_id +"::"+ qty ) );
				$.ajax({
					//query the product using 'entry_id' 
					//subtract in_stock using 'qty'
					
					url: "{path='purchase_order/updateProduct'}/"+ entry_id +"/"+ qty 
				})
				.done(function(result){
					alert(result);
				});
			}//for-loop
		};
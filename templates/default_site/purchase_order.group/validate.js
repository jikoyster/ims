$ = jQuery.noConflict();
$("#publishForm").submit(function(){
	po_status = $("select[name=po_status] option:selected").val();	

	switch( po_status ){
		case "PENDING": // but you still have to update product's order_status -> 'Ordered'
			return place_order("Ordered");
			break;
		case "RECEIVED": //update product's order_status -> 'Not Ordered'
			return update_products("Not Ordered"); 
			break;
	}
});

var validate_fields = function(){
	valid = false;
	fields = [];
	/* start field validation */
	elemi = 0;
	po_num = "input[name=po_num]";
	if( $(po_num).val() == ''){
		make_error(po_num);
		fields[elemi++] = false;//not valid
	}else{
		rem_error("input[name=po_num]");
		fields[elemi++] = true;//valid
	}

	supplierElem = ".po_supplier select";
	if( $(supplierElem +" option:selected").val() == ''){
		make_error(supplierElem);
		fields[elemi++] = false;//not valid
	}else{
		rem_error(supplierElem);
		fields[elemi++] = true;//valid
	}

	deliveredElem = ".delivered_to";
	if( $(deliveredElem +" select option:selected").val() == ''){
		make_error(deliveredElem +" select");
		make_error(deliveredElem +" textarea");
		fields[elemi++] = false;//not valid
	}else{
		rem_error(deliveredElem +" select");
		rem_error(deliveredElem +" textarea");
		fields[elemi++] = true;//valid
	}
	/* end validation : return false if one of the fields is invalid/false else return true*/
	if(jQuery.inArray(false, fields) == -1){
		return true;
	}else{
		return false;
	}
};

var make_error = function(elem){
	$(elem).addClass("error");
	toTop();
};
var rem_error = function(elem){
	$(elem).removeClass("error");
};

var toTop = function(){
	$("html, body").animate({
		scrollTop: 0
	}, 'fast');
};

/* Updating products */
var update_products = function(order_status){
			prod_count = $('.listrow').length;
			for(var i=0; i<prod_count; i++){
				entry_id	= $('.listrow:eq('+i+')').find('.entry_id').text();
				qty 		= $('.listrow:eq('+i+')').find('.qty input').val();

				window.open("{path='purchase_order/updateProduct'}/"+ entry_id +"/"+ qty +"?order_status="+order_status, "", "height=250, width=500");
			}//for-loop
		};

/* place order */
var place_order = function(order_status){
			
			if(validate_fields()){
				prod_count = $('.listrow').length;
				for(var i=0; i<prod_count; i++){
					entry_id	= $('.listrow:eq('+i+')').find('.entry_id').text();
					window.open("{path='purchase_order/updateProduct'}/"+ entry_id +"?order_status="+order_status, "", "height=250, width=500");
				}//for-loop
				return true;
			}else{
				return false;
			}
			
		};
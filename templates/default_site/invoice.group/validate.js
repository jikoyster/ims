$ = jQuery.noConflict();
$("#publishForm").submit(function(){
	return validate_fields();		
});

var validate_fields = function(){
	valid = false;
	fields = [];
	/* start field validation */
	elemi = 0;
	invoiceNumElem = "input[name=dummy_title]";
	if( $(invoiceNumElem).val() == ''){
		make_error(invoiceNumElem);
		fields[elemi++] = false;//not valid
	}else{
		rem_error(invoiceNumElem);
		fields[elemi++] = true;//valid
	}

	// customerElem = ".customer select";
	// if( $(customerElem +" option:selected").val() == ''){
	// 	make_error(customerElem);
	// 	fields[elemi++] = false;//not valid
	// }else{
	// 	rem_error(customerElem);
	// 	fields[elemi++] = true;//valid
	// }
	
	/* end validation : return false if one of the fields is invalid/false else return true*/
	if(jQuery.inArray(false, fields) == -1){
		update_products();
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
var update_products = function(){
			prod_count = $('.listrow').length;
			for(var i=0; i<prod_count; i++){
				entry_id	= $('.listrow:eq('+i+')').find('.entry_id').text();
				qty 		= $('.listrow:eq('+i+')').find('.qty input').val();
				// console.log( JSON.stringify( entry_id +"::"+ qty ) );
				// $.ajax({
				// 	//query the product using 'entry_id' 
				// 	//subtract in_stock using 'qty'
					
				// 	url: "{path='invoice/updateProduct'}/"+ entry_id +"/"+ qty 
				// })
				// .done(function(result){
				// 	alert(result);
				// });
				window.open("{path='invoice/updateProduct'}/"+ entry_id +"/"+ qty, "", "height=250, width=500");
				window.close();
			}//for-loop
		};
var init_list = function(){
			invoice_list = 	'<div class="headlist" style="'+ style.head.borderBottom + style.head.fontWeight +'">' +
							'<b style="'+ style.common.cellL +'">Product Name</b>' +
							'<b style="'+ style.common.cellM +'">Product Code</b>' +
							'<b style="'+ style.common.cellXS +'">Qty</b>' +
							'<b style="'+ style.common.cellS + style.common.alignRight +'">Price</b>' +
							'<b style="'+ style.common.cellM + style.common.alignRight +'">Amount</b>' +
							'<b style="'+ style.common.cellXS + style.common.alignCenter +'">&nbsp;</b>' +
						'</div>'+
						'<div class="bodylist">';					

						invoice_list +=	'</div>';

			jQuery('#invoice_product_list').text( invoice_list );
		};//init_list()
		

// (function(){
	style = {
		common	:	{
				'cellL'			: 'display: inline-block; width: 250px;',
				'cellM'			: 'display: inline-block; width: 200px;',
				'cellS'			: 'display: inline-block; width: 130px;',
				'cellXS'		: 'display: inline-block; width: 50px;',
				'alignLeft'		: 'text-align: left;',
				'alignCenter'	: 'text-align: center;',
				'alignRight'	: 'text-align: right;',
				'box'			: 'border: 1px solid #eee;',
		},
		head 	: 	{
				'fontWeight'	: 'font-weight: bold;',
				'borderBottom' 	: 'border-bottom: 3px solid #000;',
		},
		body	:	{
				'borderBottom'	: 'border-bottom: 1px dashed #efefef;',
		},
	};


	
	
	


	

	
	var amounts = [];
	set_amount = function(x){
		curRow = jQuery(x).closest('.listrow');
		curIndex = jQuery(curRow).index();

		qty = jQuery(x).val();
		jQuery(x).attr('value', qty);
		price = jQuery(curRow).find('.price').text();
		amount = parseFloat(qty) * parseFloat(price.replace(',',''));
		amount = (amount)? amount : 0 ;
		amounts[curIndex] = amount;

		jQuery(curRow).find('.amount').text( addCommas(amount.toFixed(2)) );
		set_subtotal();
		set_tax_amount();
		
	};//set_amount()

	set_subtotal = function(){
		subtotal = 0;

		for(var i=0; i<amounts.length; i++){
			subtotal += parseFloat(amounts[i]);
			console.log(i+":"+subtotal);
		}
		subtotal = parseFloat(subtotal).toFixed(2);
		jQuery('input[name=invoice_subtotal]').val( addCommas(subtotal) );

		set_tax_amount();
		// set_total_amount();
	};

	set_tax_amount = function(tax_rate){
		subtotal = (jQuery('input[name=invoice_subtotal]').val()).replace(/\,/g,'');
		tax_rate = jQuery('input[name=invoice_tax_rate]').val();

		// console.log( "onsettaxamount: "+ subtotal +"---"+ tax_rate );////
		
		tax_amount = (tax_rate/100) * (subtotal);
			tax_amount_str = addCommas(tax_amount.toFixed(2));
		// console.log( subtotal +':::'+ tax_rate );
		jQuery('input[name=invoice_tax_amount]').val( tax_amount_str );
		total_amount = parseFloat(subtotal) + parseFloat(tax_amount);
			total_amount_str = addCommas(total_amount.toFixed(2));
		set_total_amount(total_amount_str);
	};

	set_total_amount = function(total_amount){
		jQuery('input[name=invoice_total_amount]').val(total_amount);
	};

	togglePopup = function(){
		jQuery(".popup-wrapper").toggleClass('show');
		popup_position();
	};

	popup_position = function(){
		Hpos = (jQuery(window).width() - jQuery('.addToPO-popup').width())/2;
		Vpos = (jQuery(window).height() - jQuery('.addToPO-popup').height())/2;
		jQuery('.addToPO-popup').css({
			'top': Vpos +'px',
			'left': Hpos +'px'
		});
	};

	shiftClasses = function(thisIcon){
		jQuery(thisIcon).toggleClass("fa-times-circle fa-times-circle-o");
	};

	remove_product = function(thisRow){
		rowIndex = jQuery(thisRow).index();
		amounts.splice(rowIndex,1);
		jQuery(thisRow).fadeOut('fast', function(){ jQuery(this).remove(); });
		set_subtotal();

		console.log( amounts );
	};

	addToPO_field = function(){
		$ = jQuery.noConflict();
		products = invoice_product_list;
		console.log( product );
		//invoice_list = $(".WysiHat-editor .bodylist").text();////
		// for(var i=0; i<products.length; i++){
			entry_id		 = product.entry_id; 
			product_name 	 = product.product_name;
			product_code 	 = product.product_code;
			price 			 = product.price;

			invoice_list = 	'<div class="listrow" id="row-'+entry_id+'"' +
						'style="'+ style.body.borderBottom +'overflow: hidden;">'+
							'<b class="entry_id" style="display:none;">'+entry_id+'</b>'+
							'<b class="product_name" style="'+ style.common.cellL +'">'+product_name+'</b>'+
							'<b class="product_code" style="'+ style.common.cellM +'">'+product_code+'</b>'+
							'<b class="qty" style="'+ style.common.cellXS +'">'+
							'<input type="text" name="qty" value="0" onkeyup="set_amount(this)" style="'+ style.common.cellXS +'" />' +
							'</b>'+
							'<b class="price" style="'+ style.common.cellS + style.common.alignRight +'">'+price+'</b>'+
							'<b class="amount" style="'+ style.common.cellM + style.common.alignRight +'">0.00</b>'+
							'<b class="remove_product" style="'+ style.common.cellXS + style.common.alignCenter +'">'+
								'<a href="#"><i class="fa fa-times-circle"' +
									'onmouseover="shiftClasses(this)" onmouseout="shiftClasses(this)"'+
									'onclick="remove_product(\'#row-'+entry_id+'\')"' +
									'></i>' +
								'</a>' +
							'</b>' +
						'</div>';
			
			
			$(".WysiHat-editor .bodylist").append(invoice_list);////
		// }//for
	};

	var subtotal = 0;
	var inv = angular.module('invoice', []);
	inv.controller('popupController', function(){
		
	});
	//poController

	function addCommas(nStr)
	{
	    nStr += '';
	    var x = nStr.split('.');
	    var x1 = x[0];
	    var x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
	        x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
// })();
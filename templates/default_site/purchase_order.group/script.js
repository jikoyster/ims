// (function(){
	style = {
		common	:	{
				'cellL'			: 'display: inline-block; width: 300px;',
				'cellM'			: 'display: inline-block; width: 200px;',
				'cellS'			: 'display: inline-block; width: 100px;',
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


	var init_list = function(){
			po_list = 	'<div class="headlist" style="'+ style.head.borderBottom + style.head.fontWeight +'">' +
							'<b style="'+ style.common.cellL +'">Product Name</b>' +
							'<b style="'+ style.common.cellS +'">Qty</b>' +
							'<b style="'+ style.common.cellS +'">UM</b>' +
							'<b style="'+ style.common.cellM + style.common.alignRight +'">Price</b>' +
							'<b style="'+ style.common.cellM + style.common.alignRight +'">Amount</b>' +
							'<b style="'+ style.common.cellXS + style.common.alignCenter +'">&nbsp;</b>' +
						'</div>'+
						'<div class="bodylist">';					

						po_list +=	'</div>';

			jQuery('#po_product_list').text( po_list );

			


		};//init_list()

	

	
	

	
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
		}
		subtotal = parseFloat(subtotal).toFixed(2);
		jQuery('input[name=po_subtotal]').val( addCommas(subtotal) );

		set_tax_amount();
		set_total_amount();
	};

	set_tax_amount = function(tax_rate){
		subtotal = (jQuery('input[name=po_subtotal]').val()).replace(/\,/g,'');
		tax_rate = jQuery('input[name=po_tax_rate]').val();

		console.log( "onsettaxamount: "+ subtotal +","+ tax_rate );
		
		tax_amount = (tax_rate/100) * subtotal;
			tax_amount_str = addCommas(tax_amount.toFixed(2));
		// console.log( subtotal +':::'+ tax_rate );
		jQuery('input[name=po_tax_amount]').val( tax_amount_str );
		total_amount = parseFloat(subtotal) + parseFloat(tax_amount);
			total_amount_str = addCommas(total_amount.toFixed(2));
		set_total_amount(total_amount_str);

		set_unpaid_balance();
	};

	set_total_amount = function(total_amount){
		jQuery('input[name=po_total_amount]').val(total_amount);

		set_unpaid_balance();
	};

	get_total_amount = function(){
		return jQuery('input[name=po_total_amount]').val();
	}

	set_unpaid_balance = function(){
		total_amount = parseFloat( get_total_amount().replace(/\,/g,'') );
		partial_payment = parseFloat( jQuery('input[name=partial_payment]').val() );
		if( partial_payment!=0 && partial_payment<=total_amount ){
			unpaid_balance = total_amount - partial_payment;
		}else{
			unpaid_balance = 0;
		}

		jQuery('input[name=unpaid_balance]').val( addCommas(unpaid_balance.toFixed(2)) );
	}

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
		jQuery(thisRow).fadeOut('fast', function(){ jQuery(this).remove(); });

		index = $(thisRow).index();
		amounts.splice(index, 1);

		set_subtotal();
	};

	addToPO_field = function(){
		$ = jQuery.noConflict();

		// products = po_product_list;
		po_list = '';
		
		entry_id		= product['entry_id'];
		product_name	= product['product_name'];
		qty 			= product['qty'];
		um 				= product['um'];
		price 			= product['price'];
		amount 			= product['amount'];
		

		po_list += 	'<div class="listrow" id="row-'+entry_id+'"' +
					'style="'+ style.body.borderBottom+'">'+
						'<b class="entry_id" style="display: none;">'+entry_id+'</b>'+
						'<b class="product_name" style="'+ style.common.cellL +'">'+product_name+'</b>'+
						'<b class="qty" style="'+ style.common.cellS +'">'+
						'<input type="text" name="qty" onkeyup="set_amount(this)" style="'+ style.common.cellXS +'" />' +
						'</b>'+
						'<b class="um" style="'+ style.common.cellS + style.common.alignLeft +'">'+um+'</b>'+
						'<b class="price" style="'+ style.common.cellM + style.common.alignRight +'">'+price+'</b>'+
						'<b class="amount" style="'+ style.common.cellM + style.common.alignRight +'">'+amount+'</b>'+
						'<b class="remove_product" style="'+ style.common.cellXS + style.common.alignCenter +'">'+
							'<a href="#"><i class="fa fa-times-circle"' +
								'onmouseover="shiftClasses(this)" onmouseout="shiftClasses(this)"'+
								'onclick="remove_product(\'#row-'+entry_id+'\')"' +
								'></i>' +
							'</a>' +
						'</b>' +
					'</div>';
		
		
		$(".WysiHat-editor .bodylist").append(po_list);
		
	};
		
	
	var subtotal = 0;
	var po = angular.module('po', []);
	po.controller('popupController', function(){
		
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
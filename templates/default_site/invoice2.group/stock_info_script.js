setTimeout(function(){

	$('table select').change(function(){
		if(this.value != ''){
			invoice2_type = $("input[name=invoice2_type]:checked").attr("value");
			prodID = this.value;

			priceInput = $(this).closest('tr').find('td:eq(4) input');
			umInput = $(this).closest('tr').find('td:eq(3) input');
	// alert("{path='invoice2/stock_info'}/"+ invoice2_type +"/"+ prodID);
			$.ajax({
				url: "{path='invoice2/stock_info'}/"+ invoice2_type +"/"+ prodID
			})
			.done(function(result){
				$(priceInput).val( $(result).filter("#price").text() );
				$(umInput).val( $(result).filter("#um").text() );
			});
		}else{
			$(priceInput).val( '' );
		}
	});

	$('table input').on('keyup', function(){
		qty 	= $(this).val();
		price 	= $(this).closest('tr').find('td:eq(4) input').val();
		amount	= qty * price;

		DecimalAmount 		= amount.toFixed(2);
		DecimalAmountSplit 	= DecimalAmount.split(".");
		WholeNumber			= parseInt(DecimalAmountSplit[0]).toLocaleString();
		FinalAmount			= WholeNumber +"."+ DecimalAmountSplit[1];

		$(this).closest('tr').find('td:eq(5) input').attr( 'value', FinalAmount );
	});

}, 1000);
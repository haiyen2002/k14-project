var quantity = parseInt($("#solg").val())
$("#solg").val(quantity)
function plus(){
    quantity +=1
    if(quantity > $('#solg').attr('max')){
        quantity = $('#solg').attr('max')
    }
    $("#solg").val(quantity)
}

function minus(){
    quantity -= 1
    if(quantity < parseInt( $('#solg').attr('min'))){
        quantity = parseInt( $('#solg').attr('min'))
    }
    $("#solg").val(quantity)
}
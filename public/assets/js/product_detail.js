var quantity = parseInt($("#solg").val());
$("#solg").val(quantity);
function plus() {
  quantity += 1;
  if (quantity > $("#solg").attr("max")) {
    quantity = $("#solg").attr("max");
  }
  $("#solg").val(quantity);

}

function minus() {
  quantity -= 1;
  if (quantity < parseInt($("#solg").attr("min"))) {
    quantity = parseInt($("#solg").attr("min"));
  }
  $("#solg").val(quantity);
}

//change image


function changeImage(){
  $(".container-product-left-img__img").click(function () {
    $('.main-image img').attr('src', $(this).attr('src'))
    $('.main-image img').attr('data-zoom', $(this).attr('src'))
  })
}
changeImage()

//end change image

//add product and checkout
function addPrdCheckout(){
  $('.prd-detail-add button').click(async function(){
 
    try {
   //lay id san pham
      var id_prd = $(this).attr('data-product-id');
      var quantity_prd = $("#solg").val()
      var name_prd = $(".prd-detail-name p").text();
      var image_prd = $(".prd-detail-img").attr('src');
      var price_prd =parseInt($(".prd-detail-price span").text())*1000
      var totalPrice_prd = price_prd*quantity_prd
      let product = {
        name: name_prd,
        image: image_prd,
        id: id_prd,
        count: quantity_prd,
        price: totalPrice_prd,
        basePrice: price_prd,
      };
    
      var arr = [{productId:id_prd,quantity:quantity_prd}]
      const result =  await $.ajax({
          url: '/cart/cart',
          type:'PUT',
          data: {prd: arr}
      })
      
      
      if(result.status == 200){
        window.location.href = '/cart'
        productsInCart.push(product)
        localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
      }
      
    } catch (error) {
      console.log(error);
    }
  })
}

addPrdCheckout()

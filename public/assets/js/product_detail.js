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
  $($(".container-product-left-img__img")[0]).addClass('border-active');
  $(".container-product-left-img__img").click(function () {
   
    $(".container-product-left-img__img").each(function(){
      $(this).removeClass('border-active')
    })
    $(this).addClass('border-active');
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
    
      var arr = [id_prd,quantity_prd]
      const result =  await $.ajax({
          url: '/cart/add',
          type:'PUT',
          data: {
            productId: id_prd,
            quantity: quantity_prd
          }
      })
      console.log(result)
      
      if(result.status == 200){
        window.location.href = '/cart'
        updateProductsInCart(product)
        // productsInCart.push(product)
        localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
      }
      
    } catch (error) {
      console.log(error);
    }
  })
}

addPrdCheckout()


$(".owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: true,
  items: 1,
  // navText: [
  //   '<span><i class="fas fa-angle-left"></i></span>',
  //   '<span><i class="fas fa-angle-right"></i></span>',
  // ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
});
$(document).ready(function () {
  var type = "";
  var priceMin = 0;
  var priceMax = 100000000;
  var products;
  $.ajax({
    url: `/filter/`,
    method: "POST",
    data: { type },
  })
    .then((res) => {
      products = res.products;
    })
    .catch((err) => console.log(err));
  $(".filter-checkbox").each(function () {
    $(this).on("click", () => {
      type = $(this).val();
      $.ajax({
        url: `/filter/`,
        method: "POST",
        data: { type },
      })
        .then((res) => {
          products = res.products;
          render();
        })
        .catch((err) => console.log(err));
    });
  });
  $(".price-checkbox").each(function () {
    $(this).on("click", () => {
      priceMin = $(this).attr("min");
      priceMax = $(this).attr("max");
      render();
    });
  });

  function render() {
    $(".filter-product-results").empty();
    for (var i = 0; i < products.length; i++) {
      var price = products[i].price.split(",").join("");
      if (parseInt(price) <= priceMax && parseInt(price) >= priceMin) {
        var productItem = `
                                <div class="filter-col filter-col-3 currProduct product-card_item">   
                                    <a class="product-filter__card" href="/product/detail/${products[i]._id}">
                                        <div class="product-filter-card__top">
                                            <img class="img-prd" src="${products[i].img[0]}" alt="">
                                        </div>
                                        <div class="product-filter-card__bottom">
                                            <div class="product-filter-card__name product-card_title">${products[i].name}</div>
                                            <div class="product-filter-card__price product-card_price">${products[i].price}</div>
                                        </div>
                                    </a>          
                                    <button class="add-to-cart" data-product-id="${products[i]._id}">
                                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                                    </button>
                                </div>
                                `;
        $(".filter-product-results").append(productItem);
      }
    }
  }
});

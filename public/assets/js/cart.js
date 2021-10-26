async function updatedataCart() {
  try {
    var product = JSON.parse(localStorage.getItem("shoppingCart"));
    var arr = [];
    for (let i = 0; i < product.length; i++) {
      let obj = { productId: product[i].id, quantity: product[i].count };
      arr[i] = obj;
    }
    const data = await $.ajax({
      url: "/cart/cart",
      type: "put",
      data: {
        prd: arr,
      },
    });
    if (data.status == 200) {
      window.location.href = "";
    }
  } catch (error) {
    console.log(error);
  }
}

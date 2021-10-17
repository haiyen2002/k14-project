async function order() {
  var product = JSON.parse(localStorage.getItem("shoppingCart"));
  var arr = [];
  for (let i = 0; i < product.length; i++) {
    const producId = product[i].id;
    const quantity = product[i].count;
    const obj = {producId, quantity};
    arr.push(obj);
  }
  console.log(arr);

  var comment = $("#order-comment").val();
  console.log(comment);
  try {
    const data = await $.ajax({
      url: "/cart/order",
      type: "POST",
      data: {
        product: arr,
        status: comment,
      },
    });
    if (data.status == 200) {
      alert(data.mess);
    }
  } catch (error) {
    console.log(error);
  }
}

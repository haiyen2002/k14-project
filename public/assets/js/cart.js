async function order() {  
  try {
    var product = JSON.parse(localStorage.getItem("shoppingCart"));
    console.log(4,product);
    var arr = []
    for (let i = 0; i < product.length; i++) {
      let obj = {productId :product[i].id, quantity: product[i].count};
      arr[i] = obj
    }
    console.log(10, arr);
    var comment = $("#order-comment").val();
    console.log(comment);
    const data = await $.ajax({
      url: "/cart/order",
      type: "post",
      data: {
        prd: arr,
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

async function deleteCart(){
    try {
        const data = await $.ajax({
            url: "/cart/order",
            type: "delete"
        })
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
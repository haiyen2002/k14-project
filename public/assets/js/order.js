async function listorder() {
  var product = JSON.parse(localStorage.getItem("shoppingCart"));
  var total = 0;
  for (let i = 0; i < product.length; i++) {
    total += product[i].price;
  }
  //   console.log(total);
  try {
    const data = await $.ajax({
      url: "/cart/order",
      type: "post",
      data: {
        totalPrice: total,
      },
    });
    if (data.status == 200) {
      alert(data.mess);
      localStorage.removeItem("shoppingCart");
      window.location.href = "/"
    }else if(data.status == 400){
        alert(data.mess)
        window.location.href = "/"
    }
  } catch (error) {
    console.log(error);
  }
}

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
      header: {},
    });
    if (data.status == 200) {
      console.log(data.mess);
    }
  } catch (error) {
    console.log(error);
  }
}

updatedataCart();

$.ajax({
    url: "/order",
    type: "get"
}).then(data=>{
    if(data.status == 400){
        window.location.href = "/"
    }
}).catch(err=>{
    console.log(err);
})

async function update_cart() {  
    try {
      var product = JSON.parse(localStorage.getItem("shoppingCart"));
      console.log(4,product);
      var arr = []
      for (let i = 0; i < product.length; i++) {
        let obj = {productId :product[i].id, quantity: product[i].count};
        arr[i] = obj
      }
      const data = await $.ajax({
        url: "/cart/update-cart",
        type: "put",
        data: {
          prd: arr,
        },
      });
      if (data.status == 200) {
        alert(data.mess);
      }
    } catch (error) {
      console.log(error);
    }
  }
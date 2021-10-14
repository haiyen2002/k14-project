let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
if (!productsInCart) {
  productsInCart = [];
}
const parentElement = document.querySelector("#buyItems");
const parentElement_content = document.querySelector("#buyItems-content");
const parentElement_sumPrice = document.querySelector("#buyItems-sumPrice");
const cartPrd = document.querySelector("#sum-prd");
const products = document.querySelectorAll(".product-under");
const empty = document.querySelector("#empty");

const countTheSumPrd = function () {
  // 4
  let sum = 0;
  productsInCart.forEach((item) => {
    sum += item.count;
  });
  return sum;
};

const countTheSumPrice = function () {
  // 5
  let sum1 = 0;
  productsInCart.forEach((item) => {
    sum1 += item.price;
  });
  return sum1;
};

const updateShoppingCartHTML = function () {
  // 3
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
  if (productsInCart.length > 0) {
    let result = productsInCart.map((product) => {
      return `
      <div class="buyItem">
        <div>
            <img src="${product.image}">
        </div>
        <div>
            <p>${product.name}</p>
        </div>

        <div>
            <p>${product.basePrice}</p>
        </div>
        
        <div>
            <button class="button-minus" data-id="${product.id}">-</button>
            <span class="countOfProduct">${product.count}</span>
            <button class="button-plus" data-id="${product.id}">+</button>
        </div>
        <div>
            <p>${product.price}</p>
        </div>
      </div> 
      <hr>`;
    });
    parentElement.innerHTML = result.join("");
    parentElement_content.innerHTML = `
        <div class="buyItems-content">
        <div></div>
            <div>Sản phẩm</div>
            <div>Giá</div>
            <div>Số lượng</div>
            <div>Thành tiền</div>
        </div>`;
    cartPrd.innerHTML = countTheSumPrd();

    parentElement_sumPrice.innerHTML = `
                  <div class="buyItems-sumPrice">
                    <div>Tổng tiền</div>
                    <div class="buy-sumPrice">${countTheSumPrice()}</div>
                  </div>`;
  } else {
    parentElement.innerHTML = `<p class="empty">Giỏ hàng đang trống. Mua sắm ngay nào ^_^</p>`;
    cartPrd.innerHTML = "0";
    parentElement_content.innerHTML = "";
    parentElement_sumPrice.innerHTML = "";
  }
};

function updateProductsInCart(product) {
  // 2
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {
      productsInCart[i].count += 1;
      productsInCart[i].price =
        productsInCart[i].basePrice * productsInCart[i].count;
      return productsInCart[i];
    }
  }
  productsInCart.push(product);
}

products.forEach((item) => {
  // 1
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("addToCart")) {
      const productID = e.target.dataset.productId;
      const productName = item.querySelector(".productName").innerHTML;
      const productPriceS = item.querySelector(".priceValue").innerHTML;
      const productImage = item.querySelector("img").src;
      const productPrice = parseInt(productPriceS);
      let product = {
        name: productName,
        image: productImage,
        id: productID,
        count: 1,
        price: productPrice,
        basePrice: productPrice,
      };
      updateProductsInCart(product);
      updateShoppingCartHTML();
    }
  });
});

parentElement.addEventListener("click", (e) => {
  // Last
  const isPlusButton = e.target.classList.contains("button-plus");
  const isMinusButton = e.target.classList.contains("button-minus");
  if (isPlusButton || isMinusButton) {
    for (let i = 0; i < productsInCart.length; i++) {
      if (productsInCart[i].id == e.target.dataset.id) {
        if (isPlusButton) {
          productsInCart[i].count += 1;
        } else if (isMinusButton) {
          productsInCart[i].count -= 1;
        }
        productsInCart[i].price =
          productsInCart[i].basePrice * productsInCart[i].count;
      }
      if (productsInCart[i].count <= 0) {
        productsInCart.splice(i, 1);
      }
    }
    updateShoppingCartHTML();
  }
});

updateShoppingCartHTML();

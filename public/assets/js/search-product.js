//header-btn-search
$('#header-btn-search').on("click", () => {
  $('.search-overlay').addClass('active')
  $('body').css("overflow-y", "hidden");
})

//btn close
$(".search-overlay-close").on("click", () => {
  $('.search-overlay').removeClass('active')
  $('body').css("overflow-y", "");
})

$('.search-overlay').on("click", () => {
  $('.search-overlay').removeClass('active')
  $('body').css("overflow-y", "");
})

$('.select-overlay-top').on("click", (event) => {
  event.stopPropagation();
})

//search
// const inputdata = document.getElementById("input_search");
//get type
var selected = $(".select-box").val();

$(".select-box").on("change", () => {
  selected = $(".select-box").val();
});

//get all products
var allProducts = [];

async function openSearch(){
    // console.log('ok')
  const res = await $.ajax({
    url:'/allproduct',
    type:'POST'
  })
  allProducts = res.products;
  // console.log(allProducts)
}

// su dung thu vien chuyen doi tieng viet
const { removeVI, DefaultOption } = jsrmvi;
// bat su kien nhap vao tai o input search
$('#input_search').keyup(async (e) => {
  var inputVal = removeVI(e.target.value, { ignoreCase: false, replaceSpecialCharacters: false}).toLowerCase()
  if(inputVal === ''){
    $(".select-overlay-bottom").html("");
  }else{
    $(".select-overlay-bottom").html("");
    var flag = 0;
    allProducts.forEach(product => {
      if (removeVI(product.name, { ignoreCase: false, replaceSpecialCharacters: false}).toLowerCase().includes(inputVal)
        && product.prd_key.includes(selected)
      ){
        var template = `
                            <a href="/product/detail/${product._id}" class="search-result-item">                              
                            <div><img src = "${product.img[0]}" > </div>
                               <div>${product.name} </div>
                               <div>${product.price} </div>
                           </a>
                         `;
            $(".select-overlay-bottom").append(template);
            flag = 1;
      }
    })
    if(flag == 0){
      $(".select-overlay-bottom").append("<div style='text-align :center'> Không tìm thấy sản phẩm</div>")
    }
  }
})

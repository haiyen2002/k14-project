$(".header-top").toggleClass("fade", window.scrollY > 150);
$(".header-main").toggleClass("sticky", window.scrollY > 100);

window.addEventListener("scroll", () => {
    $(".header-top").toggleClass("fade", window.scrollY > 150);
    $(".header-main").toggleClass("sticky", window.scrollY > 100);
  });
  
  // MODAL-LOGIN*****
  $(".top-right-item").on("click", () => {
    $(".modal-login").css("display", "flex");
  });
  
  $(".mobile-login").on("click", () => {
    $(".modal-login").css("display", "flex");
  });
  
  function offModal() {
    $(".modal-login").css("display", "none");
  }
  $(".modal-login").on("click", offModal);
  $(".close-login").on("click", offModal);
  $(".box-login").on("click", (event) => {
    event.stopPropagation();
  });
  
  // MODAL-SEARCH**********
  $(".search-up").on("click", () => {
    $(".modal-search").css("display", "flex");
  });
  function offModalSearch() {
    $(".modal-search").css("display", "none");
  }
  $(".modal-search").on("click", offModalSearch);
  $(".box-search").on("click", (event) => {
    event.stopPropagation();
  });
  
  // MODAL-MOBILE**********
  
  $(".main-mobile-item").on("click", () => {
    $(".modal-nav-mobile").css("display", "flex");
    $(".main-mobile-item").css("display", "none");
  });
  function offModalMobile() {
    $(".modal-nav-mobile").css("display", "none");
    $(".main-mobile-item").css("display", "block");
  }
  $(".modal-nav-mobile").on("click", offModalMobile);
  $(".modal-mobile").on("click", (event) => {
    event.stopPropagation();
  });
  
// SHOW CHILREN //

for (let i = 1; i < 4; i++) {
    $(`.more-link-item${i}`).on("click", () => {
        $(`.children${i}`).css("display", "block");
        $(`.more-link-item${i}`).css("display", "none");
        $(`.more-link-item-click${i}`).css("display", "block");
      });
      $(`.more-link-item-click${i}`).on("click", () => {
        $(`.children${i}`).css("display", "none");
        $(`.more-link-item${i}`).css("display", "block");
        $(`.more-link-item-click${i}`).css("display", "none");

      })
    
}


// SEARCH //

const inputSearch = document.getElementById("search")


inputSearch.addEventListener("keyup", (e) => {
    $('.list-search').html('');
    search(e.target.value)
})


function search(inputSearch) {
    if (inputSearch != '') {
        $.ajax({
            url: `/search`,
            type: "POST",
            data: {
                name: inputSearch,              
        }
            }).then(data => {
            var newdata = data.data;
            if (newdata.length > 0) {
                for (var i = 0; i < newdata.length; i++) {
                    var item = `
                            <a href="/products/${newdata[i]._id}" class="search-item">
                                <div class="img-search-item"><img class="img-search" src = "${newdata[i].img[0]}" ></div>
                                <div class="name-search-item">${newdata[i].name} </div>
                                <div class="price-search-item">${newdata[i].price} </div>
                            </a>
                           `
                    $('.list-search').append(item)
                }
            } else {
                $('.list-search').html("<div style='text-align :center'> Không tìm thấy sản phẩm</div>")
            }
        }).catch(err => console.log(err))
    }
}





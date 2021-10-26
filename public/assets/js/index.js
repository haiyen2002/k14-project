// button go to top:
var buttonGoTop = $(".go-top");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    buttonGoTop.addClass("show");
  } else {
    buttonGoTop.removeClass("show");
  }
});

window.addEventListener("scroll", () => {
  $(".header-bottom").toggleClass("sticky", window.scrollY > 100);
});

//header-btn-search
$("#header-btn-search").on("click", () => {
  $(".search-overlay").addClass("active");
  $("body").css("overflow-y", "hidden");
});

//btn close
$(".search-overlay-close").on("click", () => {
  $(".search-overlay").removeClass("active");
  $("body").css("overflow-y", "");
});

$(".search-overlay").on("click", () => {
  $(".search-overlay").removeClass("active");
  $("body").css("overflow-y", "");
});

$(".select-overlay-top").on("click", (event) => {
  event.stopPropagation();
});

//slider
$("#slider-top .owl-carousel").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  nav: true,
  items: 1,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

//main
const typeBtns = document.querySelectorAll(".nav-product-popular__item");
const listSection = document.querySelectorAll(".section-list-product");

typeBtns[0].classList.add("active");
listSection[0].classList.add("active");

for (let i = 0; i < typeBtns.length; i++) {
  typeBtns[i].addEventListener("click", () => {
    removeClass();
    typeBtns[i].classList.add("active");
    listSection[i].classList.add("active");
  });
}

function removeClass() {
  for (let i = 0; i < typeBtns.length; i++) {
    typeBtns[i].classList.remove("active");
    listSection[i].classList.remove("active");
  }
}

//carousel:
$("#owl-0").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  slideBy: 3,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      nav: true,
      items: 5,
    },
  },
});

$("#owl-1").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  slideBy: 3,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      nav: true,
      items: 5,
    },
  },
});

// $('.owl-nav').removeClass('disabled')
//news carousel
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  slideBy: 3,
  nav: true,
  navText: [
    '<span><i class="fas fa-angle-left"></i></span>',
    '<span><i class="fas fa-angle-right"></i></span>',
  ],
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
        nav:true,
      items: 5,
    },
  },
});


//search
const inputdata = document.getElementById("input_search");
var selected = $(".select-box").val();

$(".select-box").on("change", () => {
  selected = $(".select-box").val();
});
inputdata.addEventListener("keyup", (e) => {
  $(".select-overlay-bottom").html("");
  showResult(e.target.value);
});

//resize with select type
// $("#width_tmp_option").html($('.select-box').find(':selected').text());
// $('.select-box').width(60);

$(".select-box").on("change", () => {
  console.log($(".select-box option:selected"));
  //   $(".select-types").width($('.select-box').find(":selected").width());
});

function showResult(inputdata) {
  if (inputdata != "") {
    $.ajax({
      url: `/`,
      method: "POST",
      data: {
        name: inputdata,
        type: selected,
      },
    })
      .then((res) => {
        var result = res.data;
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            var template = `
                            <a href="/product/detail/${result[i]._id}" class="search-result-item">
                                <div><img src = "${result[i].img[0]}" > </div>
                                <div>${result[i].name} </div>
                                <div>${result[i].price} </div>
                            </a>
                           `;
            $(".select-overlay-bottom").append(template);
          }
        } else {
          $(".select-overlay-bottom").html(
            "<div style='text-align :center'> Không tìm thấy sản phẩm</div>"
          );
        }
      })
      .catch((err) => console.log(err));
  }
}

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
  });
}
function checklogin() {
  $.ajax({
    url: "/user/checkLogin",
    type: "POST",
    headers: {},
  })
    .then((data) => {
      if (data.status === 200) {
        $(".header-top_account").html("");
        const IdAccount = data.id;
        $.ajax({
          url: "user/" + IdAccount,
          type: "GET",
        }).then((resultdata) => {
          $(".header-top_account").html(` 
            <button style = "    display: flex;
            width: auto;
            padding-left: 10px;
            padding-right: 10px;
            color: black;
            border: none;
            background-color: white;"><a class="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button"
            data-mdb-toggle="dropdown" aria-expanded="false">
            <img src="${
              resultdata.avatar
            }" class="rounded-circle" height="30" width="30" alt=""
                loading="lazy"/>
            </a>
            <span data-mdb-toggle="dropdown" style="line-height: 30px;">${
              resultdata.firstname
            } ${` `}${resultdata.lastname}</span>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
            <li>
            <i class="fas fa-users"></i>
                <a class="dropdown-item" href="/changeprofile" >Change Profile</a>
            </li>
            <li>
            <i class="fas fa-lock-open"></i>
                <a class="dropdown-item" href="/changepass" >Change Password</a>
            </li>
            <li>
            <i class="fas fa-sign-out-alt"></i>
                <a class="dropdown-item" href="#" onclick="logout()">Logout</a>
            </li>
            </ul> </button>`);
        });
      }
    })
    .catch((err) => {
      window.location.href = "/500";
    });
}

checklogin();

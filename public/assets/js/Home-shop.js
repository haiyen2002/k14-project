window.addEventListener("scroll", () => {
  $(".header-top").toggleClass("fade", window.scrollY > 100);
  $(".header-main").toggleClass("sticky", window.scrollY > 150);
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

//SHOW-CHILDREN-ITEM-NAV-MOBILE -1
$(".more-link-item1").on("click", () => {
  $(".children1").css("display", "block");
  $(".more-link-item1").css("display", "none");
  $(".more-link-item-click1").css("display", "block");
});
$(".more-link-item-click1").on("click", () => {
  $(".children1").css("display", "none");
  $(".more-link-item1").css("display", "block");
  $(".more-link-item-click1").css("display", "none");
});
//SHOW-CHILDREN-ITEM-NAV-MOBILE - 2
$(".more-link-item2").on("click", () => {
  $(".children2").css("display", "block");
  $(".more-link-item2").css("display", "none");
  $(".more-link-item-click2").css("display", "block");
});
$(".more-link-item-click2").on("click", () => {
  $(".children2").css("display", "none");
  $(".more-link-item2").css("display", "block");
  $(".more-link-item-click2").css("display", "none");
});
//SHOW-CHILDREN-ITEM-NAV-MOBILE - 3
$(".more-link-item3").on("click", () => {
  $(".children3").css("display", "block");
  $(".more-link-item3").css("display", "none");
  $(".more-link-item-click3").css("display", "block");
});
$(".more-link-item-click3").on("click", () => {
  $(".children3").css("display", "none");
  $(".more-link-item3").css("display", "block");
  $(".more-link-item-click3").css("display", "none");
});

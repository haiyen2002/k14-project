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

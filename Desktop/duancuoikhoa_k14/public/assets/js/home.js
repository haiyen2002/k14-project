var delete_cookie = function (name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
async function logout() {
  console.log("condition");
  try {
    const logout = await $.ajax({
      url: "/check/logout",
      type: "POST",
    });
    console.log(logout);
    if (logout.status == "200") {
      delete_cookie();
      window.location.href = "/";
    } else if (logout.status == "500") {
      delete_cookie();
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
}

var working = false;
$(".login").on("submit", function (e) {
  let username = $("[type='text']").val();
  let password = $("[type='password']").val();

  e.preventDefault();
  if (working) return;
  working = true;
  var $this = $(this),
    $state = $this.find("button > .state");
  $this.addClass("loading");
  $state.html("Authenticating");
  setTimeout(function () {
    $this.addClass("ok");
    $state.html("finish loading...");
    setTimeout(function () {
      $state.html("Log in");
      $this.removeClass("ok loading");
      working = false;
      const checkcount = $.ajax({
        url: "/check/login",
        type: "POST",
        data: { username, password },
      });
      console.log(checkcount);
      console.log(checkcount.status);
      if (checkcount.status == "200") {
        window.location.href = "/";
      }
      if (checkcount.status == "400") {
        console.log("error password");
      }
    }, 4000);
  }, 3000);
});

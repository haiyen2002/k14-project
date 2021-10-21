var delete_cookie = function (name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function logout() {
  delete_cookie("user");
  window.location.href = "/admin/login";
}

var working = false;
$(".login").on("submit", function (e) {
  let username = $("[type='text']").val();
  let password = $("[type='password']").val();
  // if (username != "admin" && password != "admin") {
  //   alert("error username or password");
  // }
  if (username == "admin" && password == "admin") {
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
        setCookie("user", "admin", 30);
        window.location.href = "/admin";
      }, 4000);
    }, 3000);
  }
});

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

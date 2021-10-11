async function sigup() {
  try {
    const firtname = $("#lastname").val();
    const lastname = $("#Firtname").val();
    const Username = $("#inputEmail").val();
    const pass_sign = $("#inputPws").val();
    const passconfimsign = $("#inputConfirmPws").val();
    const gender = $('input[name="sex').val();
    var date = new Date($("#birthday").val());
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    const birthday = day + "/" + month + "/" + year;

    const result = await $.ajax({
      url: "user/signup",
      type: "POST",
      data: {
        firstname: firtname,
        lastname: lastname,
        username: Username,
        password: pass_sign,
        birthday: birthday,
        gender: gender,
      },
    });

    if (result.status == 200) {
      alert("đăng kí thành công");
      return;
    }

    if (result.status == 400) {
      alert("error");
      return;
    }
  } catch (error) {
    window.location.href = "/500";
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

async function login() {
  try {
    const username = $("#email").val();
    const password = $("#pws").val();
    const res = await $.ajax({
      url: "/user/login",
      type: "POST",
      data: { username, password },
    });

    if (res.status === 200) {
      setCookie("user", res.id, 30);
      window.location.href = "/";
    }
    console.log(res);
  } catch (error) {
    window.location.href = "/500";
  }
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

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
      <img src="${resultdata.avatar}" style="margin-right: 10px;
      height: 30px;" class="rounded-circle" height="25" alt=""
          loading="lazy"/>
      </a>
      <span data-mdb-toggle="dropdown" style="line-height: 30px;">${resultdata.username}</span>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
      <li>
      <i class="fas fa-users"></i>
          <a class="dropdown-item" href="#" onclick="ChangeProfile(id)">My profile</a>
      </li>
      <li>
      <i class="fas fa-lock-open"></i>
          <a class="dropdown-item" href="#" onclick="Changepass(id)">Change Password</a>
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

function profile() {
  window.location.href = "/account_setting";
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
async function logout() {
  try {
    const res = await $.ajax({
      url: "/user/logout",
      type: "POST",
    });
    if (res.status === 200) {
      delete_cookie("user");
      window.location.href = "/";
    }
  } catch (error) {
    window.location.href = "/500";
  }
}

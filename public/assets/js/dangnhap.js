async function dangnhap() {
  try {
    const user = $("#user").val();
    const pass = $("#pass").val();
    const data = await $.ajax({
      url: "/user/dangnhap",
      type: "post",
      data: {
        user: user,
        pass: pass,
      },
    });
    if (data.status === 200) {
      alert(data.mess);
      setCookie("user", data.id, 30);
      window.location.href = "";
    } else {
      alert(data.mess);
    }
  } catch (error) {
    console.log(error);
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

$.ajax({
  url: "/user/checkLogin",
  type: "POST",
  headers: {},
})
  .then((data) => {
    if (data.status === 200) {
      $(".login-regiser").css("display", "none");
      let info = `
      <a class="info-username">
      <img src="${data.data.avatar}" style="width: 30px; height: 30px; object-fit: cover;" alt="">
      <span>${data.data.lastname}</span>
      <span>${data.data.firstname}</span> 
      <button class="open-logout"><i class="fas fa-angle-down"></i></button>
      </a>
      
      `;
      $(".info-user").append(info);
      $(".open-logout").on("click", () => {
        $(".logout").css("display", "block");
      });
      $("html").on("click", () => {
        $(".logout").css("display", "none");
      });
      $(".logout").on("click", (event) => {
        event.stopPropagation();
      });
      $(".open-logout").on("click", (event) => {
        event.stopPropagation();
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

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
      window.location.href = "";
    }
  } catch (error) {
    console.log(error);
  }
}

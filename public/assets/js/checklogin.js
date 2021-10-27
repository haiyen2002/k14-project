function checklogin() {
    $.ajax({
      url: "/user/checkLogin",
      type: "POST",
      headers: {},
    })
      .then((data) => {
        if (data.status === 200) {
          $(".add-to-cart").css("display", "block");
          $(".to-add").css("display", "block");
          $(".header-top_account").html("");
          const IdAccount = data.id;
          $.ajax({
            url: "/user/" + IdAccount,
            type: "GET",
          }).then((resultdata) => {
            $(".header-top_account").html("");
            let user = ` 
          <button style = "display: flex;
          width: auto;  z-index: 12;
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
          </ul> </button>`;
            $(".header-top_account").append(user);
          });
          console.log(data);
        } else if(data.status == 400){
          window.location.href = "/"
        }
      })
      .catch((err) => {
        window.location.href = "/500";
      });
  }
  checklogin()
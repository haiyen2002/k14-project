async function loginAdmin(){
    try {
        const user = $("#username").val()
        const pass =  $("#password").val()
        $("#password").on("keyup", ()=>{
            $(".form-message-pass").html("")
        })
        $("#username").on("keyup", ()=>{
            $(".form-message-user").html("")
        })
        checkpass(pass)
        checkuser(user)
        if(checkpass(pass) == 100 && checkuser(user) == 100){
            const data = await $.ajax({
                url: "/admin/dangnhap",
                type: "POST",
                data: {
                    username:user,
                    password: pass
                }
            })
            if(data.status == 200){
                setCookie("user", data.id, 30);
                alert(data.mess)
                window.location.href = "/admin/"
            }else if(data.status == 400){
                $(".form-message-error").html("")
                $(".form-message-error").append(`${data.mess}`)
            }
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

  function checkuser(item){
      if(item.trim() == ""){
          $(".form-message-user").html("")
          $(".form-message-user").append("Vui lòng nhập trường này")
      }else{
          return 100
      }
  }
  function checkpass(item){
      
      if(item.trim() == ""){
          $(".form-message-pass").html("")
          $(".form-message-pass").append("Vui lòng nhập trường này")
      }else{
          return 100
      }
  }
 

  function delete_cookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  async function logoutAdmin() {
    try {
      const res = await $.ajax({
        url: "/admin/logoutAdmin",
        type: "POST",
      });
      if (res.status == 200) {
        delete_cookie("user");
        localStorage.removeItem("shoppingCart");
        window.location.href = "/admin/dangnhap";
      }
    } catch (error) {
      console.log(error);
    }
  }

  
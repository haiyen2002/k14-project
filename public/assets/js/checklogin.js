$.ajax({
url: "/user/checkLogin",
type: "POST",
headers: {},
})
.then((data) => {
    if (data.status === 200) {
    }else if(data.status == 400){
        window.location.href = "/";
        alert("Bạn chưa đăng nhập")
    }
})
.catch((err) => {
    console.log(err);
});
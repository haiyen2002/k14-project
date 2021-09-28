// button go to top:
var buttonGoTop = $(".go-top");

window.addEventListener("scroll", () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        buttonGoTop.addClass("show");
    }else{
        buttonGoTop.removeClass("show");
    }
})
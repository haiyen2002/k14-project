// button go to top:
var buttonGoTop = $(".go-top");

window.addEventListener("scroll", () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        buttonGoTop.addClass("show");
    }else{
        buttonGoTop.removeClass("show");
    }
})

//slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "flex";  
}
setInterval(()=>{
    slideIndex++;
    showSlides(slideIndex)
}, 5000)

//main
const typeBtns = document.querySelectorAll(".nav-product-popular__item");
const listSection = document.querySelectorAll(".section-list-product");

typeBtns[0].classList.add("active");
listSection[0].classList.add("active");

for( let i = 0; i < typeBtns.length; i++){
   typeBtns[i].addEventListener("click", () => {
    removeClass();
      typeBtns[i].classList.add("active");
      listSection[i].classList.add("active");
     
  })
}

function removeClass(){
  for( let i =0; i < typeBtns.length; i++){
    typeBtns[i].classList.remove("active");
    listSection[i].classList.remove("active");
  }   
}


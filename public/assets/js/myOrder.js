const container_order = document.querySelectorAll(".container-order")
const body_order = document.querySelectorAll(".body-order")
const total_money = document.querySelectorAll(".total-money")


console.log(container_order);
for (let i = 0; i < container_order.length; i++) {
    container_order[i].addEventListener("click", ()=>{
        remove()
        body_order[i].classList.add("show")
        total_money[i].classList.add("show")

    })   
    // container_order[i].addEventListener("click", ()=>{
    //     body_order[i].classList.add("fade")
    //     total_money[i].classList.add("fade")

    // })   
}

function remove() {
    for (let i = 0; i < container_order.length; i++) {
        body_order[i].classList.remove("show");
        total_money[i].classList.remove("show");
    }
  }
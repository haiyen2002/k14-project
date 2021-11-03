function toggleMenu() {
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    toggle.classList.toggle("active");
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  }
  // window.addEventListener("scroll", () => {
  //   $(".topbar").toggleClass("sticky_topbar", window.scrollY > 100);
  // });
  
  
  // modal delete
  function OffmodalDelete(){
      $(".modal_delete").css("display", "none")
  }
  
  $(".modal_close").on("click", OffmodalDelete)
  $(".modal_delete").on("click", OffmodalDelete)
  
  $(".box_modal").on("click", (event) => {
      event.stopPropagation();
  });
  
  
  
  function deleteUser(id){
      $(".modal_delete").css("display", "flex")
      $(".comfirm_delete").attr("onclick", `comfirmDelete('${id}')`)
  }
  
  // modal fix
  function OffmodalFix(){
      $(".modal_fixProduct").css("display", "none")
  }
  
  $(".close_modalFix").on("click", OffmodalFix)
  $(".modal_fixProduct").on("click", OffmodalFix)
  
  $(".box_modalFix").on("click", (event) => {
      event.stopPropagation();
    });
  
  
  
  // modal role
  
  function OffmodalRole(){
      $(".modal_Role").css("display", "none")
  }
  
  $(".modalRole_close").on("click", OffmodalRole)
  $(".modal_Role").on("click", OffmodalRole)
  
  $(".modal_roleBox").on("click", (event) => {
      event.stopPropagation();
    });
  
//   function changeRole(id){
//       $(".modal_Role").css("display", "flex")
//       $(".change_Role").attr("onclick", `RoleUpdate('${id}')`)
//   }
  
  
  
  
  
async function addProduct() {
    try {
      const form = document.querySelector("form");
      const formData = new FormData(form);
      const res = await $.ajax({
        url: "/admin/addProduct",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
      });
      if (res.status == 200) {
        alert(res.mess);
        window.location.href = "";
      }
    } catch (error) {
      console.log(error);
    }
  }
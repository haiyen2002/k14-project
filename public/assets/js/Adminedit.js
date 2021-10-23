async function ClikSend() {
  const form = document.querySelector("form");
  const formData = new FormData(form);

  const name = $("#fname").val();
  const codeprd = $("#codeproduct").val();
  const price = $("#price").val();
  const quantity = $("#quantity").val();
  const rate = $("#rate").val();
  const descriptionDetails = $("#descriptionDetails").val();
  const prd_key = $("#prd_key").val();
  const res = await $.ajax({
    url: "/check/update/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
  });
  if (res) {
    const result = await $.ajax({
      url: "/check/updatenew",
      type: "POST",
      data: {
        name: name,
        img: res.arr,
        codeProduct: codeprd,
        price: price,
        quantity: quantity,
        prd_key: prd_key,
        descriptionDetails: descriptionDetails,
        rate: rate,
      },
    });
  }
}

async function Update_Role(id) {
  const roleUpdate = await $("select[name='role'] option:selected")
    .text()
    .replace("user", "");
  const result = await $.ajax({
    url: "/check/updateUser/" + id,
    type: "PUT",
    data: { role: roleUpdate },
  });
  if (result.status == 200) {
    $(".modal__close")[0].click();
    window.location.reload();
  } else {
    alert(result.mess);
  }
}

async function deleteUser(id) {
  const result = await $.ajax({
    url: "/check/" + id,
    type: "DELETE",
  });
  if (result.status == 200) {
    window.location.reload();
  } else {
    alert(result.mess);
  }
}

async function editproduct(id) {
  const name = $("#fname_" + id).val();
  const codeproduct = $("#codeproduct_" + id).val();
  const price = $("#price_" + id).val();
  const quantity = $("#quantity_" + id).val();
  const descriptionDetails = $("#descriptionDetails_" + id).val();
  const rate = $("#rate_" + id).val();
  const prd_key = $("#prd_key_" + id).val();
  console.log(name);
  console.log(codeproduct);
  console.log(price);
  console.log(quantity);
  console.log(descriptionDetails);
  console.log(rate);
  console.log(prd_key);
}

async function deleteProduct(id) {
  console.log(id);
}

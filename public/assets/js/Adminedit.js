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
    if (result) {
      alert("add finish");
      window.location.reload();
    }
  }
}

async function Update_Role(id) {
  const roleUpdate = await $("select[id='role'] option:selected").text();
  var role = "";
  if (roleUpdate.includes("user")) {
    role = "user";
  } else {
    role = "admin";
  }
  const result = await $.ajax({
    url: "/check/updateUser/" + id,
    type: "PUT",
    data: { role: role },
  });
  console.log(result);
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
  console.log("condition");
  const name = $("#fname_" + id).val();
  const codeproduct = $("#codeproduct_" + id).val();
  const price = $("#price_" + id).val();
  const quantity = $("#quantity_" + id).val();
  const descriptionDetails = $("#descriptionDetails_" + id).val();
  const rate = $("#rate_" + id).val();
  const prd_key = $("#prd_key_" + id).val();

  const form = document.querySelector("#form_" + id);
  const formData = new FormData(form);
  if ($(".imgfocus").length != 0) {
    const updateimage = await $.ajax({
      type: "POST",
      url: "/check/updateimageprd",
      data: formData,
      processData: false,
      contentType: false,
    });
    if (updateimage) {
      try {
        const updatePrd = await $.ajax({
          type: "put",
          url: "/check/updateProduct/" + id,
          data: {
            name: name,
            img: updateimage.arr,
            codeProduct: codeproduct,
            price: price,
            quantity: quantity,
            prd_key: prd_key,
            descriptionDetails: descriptionDetails,
            rate: rate,
          },
        });
        if (updatePrd.mess == "finish") {
          $(".modal__close")[0].click();
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    try {
      const updatePrd = await $.ajax({
        type: "put",
        url: "/check/updateProduct/" + id,
        data: {
          name: name,
          codeProduct: codeproduct,
          price: price,
          quantity: quantity,
          prd_key: prd_key,
          descriptionDetails: descriptionDetails,
          rate: rate,
        },
      });
      if (updatePrd.mess == "finish") {
        $(".modal__close")[0].click();
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function deleteProduct(id) {
  const result = await $.ajax({
    url: "/check/deletePrd/" + id,
    type: "DELETE",
  });
  if (result.status == 200) {
    window.location.reload();
  } else {
    alert(result.mess);
  }
}

async function changevalue() {
  const datavalueselect =
    document.querySelector("#classify_prd")[
      document.querySelector("#classify_prd").selectedIndex
    ].text;
  if (datavalueselect == "Chăm sóc da") {
    $(".pageList").html("");
    const getresult = await $.ajax({
      type: "GET",
      url: "/check/listProducts/" + datavalueselect,
    });
    $(".showPrds").html(getresult);
  } else if (datavalueselect == "Chăm sóc tóc") {
    $(".pageList").html("");
    const getresult = await $.ajax({
      type: "GET",
      url: "/check/listProducts/" + datavalueselect,
    });
    $(".showPrds").html(getresult);
  } else if (datavalueselect == "Tất cả") {
    render();
  }
}
async function searchPrd() {
  if ($("input").val() != "") {
    $(".pageList").html("");
    const result = await $.ajax({
      type: "GET",
      url: "/check/searchprd/" + $("input").val().toUpperCase(),
    });
    console.log(result);
    $(".showPrds").html(result);
    if ($("tr").length <= 1) {
      $(".show_prds").append(
        `<span style ="display: block;padding: 70px 0;text-align: center; font-size: xx-large;margin: auto;" class="ouput_search"> No valid data found  </span>`
      );
    }
  }
  if ($("input").val() == "") {
    render();
    changePage(1);
  }
}

async function render() {
  const renderdata = await $.ajax({
    type: "GET",
    url: "/check/getPrd",
  });
  if (renderdata) {
    const totalPage = Math.ceil(renderdata / 9);
    $(".pageList").html("");
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = `
        <button onclick='changePage(${i})'>${i}</button>
        `;
      $(".pageList").append(pageButton);
    }
  }
}
render();
changePage(1);
async function changePage(page) {
  try {
    const search =
      document.querySelector("#classify_prd")[
        document.querySelector("#classify_prd").selectedIndex
      ].text;
    const data = await $.ajax({
      url: `/check/listProducts/pagination/?page=${page}&search=${search}`,
      type: "GET",
    });
    console.log(data);
    $(".showPrds").html(data);
  } catch (error) {
    console.log(error);
  }
}

function kiemtrahang() {}

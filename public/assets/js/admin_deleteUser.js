function deleteProduct(id){
    $(`#modal_delete_${id}`).css("display", "flex")
    $(".comfirm_delete").attr("onclick", `comfirmDelete('${id}')`)
}

async function comfirmDelete(id){
    try {
        const data = await $.ajax({
            url: `/admin/deleteUser/${id}`,
            type: "delete"
        })
        if(data.status == 200){
            alert(data.mess)
            window.location.href = ""
        }else if(data.status == 400){
            alert(data.mess)
        }
    } catch (error) {
        console.log(error);
    }
}
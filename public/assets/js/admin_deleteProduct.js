function deleteProduct(id){
    $(`#modal_delete_${id}`).css("display", "flex")
    $(".comfirm_delete").attr("onclick", `comfirmDelete('${id}')`)
}

async function comfirmDelete(id){
    try {
        const data = $.ajax({
            url: `/admin/deleteProduct/${id}`,
            type: "DELETE",
        })
        console.log(data);
        // alert(data.mess)      
        // window.location.href = "";
    } catch (error) {
        console.log(error);
    }
}
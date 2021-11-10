function deleteNews(id){
    $(`#modal_delete_${id}`).css("display", "flex")
    $(".comfirm_delete").attr("onclick", `comfirmDeleteNews('${id}')`)
}

async function comfirmDeleteNews(id){
    try {
        const data = await $.ajax({
            url: `/admin/deleteNews/${id}`,
            type: "DELETE",
        })
        // console.log(data);
        // alert(data.mess) 
        if(data.status == 200){
            alert(data.mess)
            window.location.href = "";
        }else if(data.status == 400){
            alert(data.mess)
        }     
    } catch (error) {
        console.log(error);
    }
}
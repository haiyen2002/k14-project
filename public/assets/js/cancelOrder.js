async function cancelOrder(id){
    try {
        const res = await $.ajax({
            url: `/cart/cancel/${id}`,
            type: "DELETE"
        })
        // console.log(res);
        if(res.status == 200 ){
            alert(res.mess)
            // console.log(res.mess);
            window.location.href = ""
        }else if (res. status == 400 ){
            alert(res.mess)
            // console.log(res.mess);
            window.location.href = ""
        }
    } catch (error) {
        console.log(error);
    }
}


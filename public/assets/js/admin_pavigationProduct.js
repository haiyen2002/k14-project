// window.addEventListener("scroll", () => {
//     if (
//       document.body.scrollTop > 0 ||
//       document.documentElement.scrollTop > 0
//     ) {
//       $(".listBtn").css("display", "flex")
//     } else{
//         $(".listBtn").css("display", "none")
//     }
//   });


//phân trang
async function render(){
    try {
        const res = await $.ajax({
            url: "/admin/getPrd",
            type: "GET"
        })
        if(res.status == 200){
            const totalPage = Math.ceil(res.data.length / 6);
            for (let i = 1; i <= totalPage; i++) {
                const btnPage = `
                <button onclick="changePage(${i})">${i}</button>
                `;
                $(".listBtn").append(btnPage)
            }
            const newdata = res.data.slice(0, 6)
            newdata.map((ele) =>{
                let itemStart = `
                <tr>
                <td>${ele._id}</td>
                <td>
                  <div class="img_Product">               
                `;
                let itemEnd = `
                </div>
                </td>
                <td>${ ele.name}</td>
                <td>${ele.prd_key}</td>
                <td>${ele.price}</td>
                <td>${ele.quantity}</td>
                <td><a href="#${ele._id}" class="btn_fix"  onclick="fixProduct('${ele._id}')">Fix</a></td>
                <td><a href="#${ele._id}"  class="btn_delete"  onclick="deleteProduct('${ele._id}')">Delete</a></td>
              </tr>`
                let data = ele.img.map(image=>{
                    return `
                    <img
                    class="img_prd"
                    src="${image}"
                    alt="chua co anh"
                  />
                    `;
                })
                let itemCenter = data.join("")

                let ok = itemStart + itemCenter + itemEnd                             
                $('tbody').append(ok)               
            })
         
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function changePage(page){
    try {
        console.log(page);
        const res = await $.ajax({
            url: `/admin/pavigationProduct?page=${page}`,
            type: "GET"
        })
        if(res.status == 200){
            $('tbody').html("") 
            let newdata = res.data
            newdata.map((ele) =>{
                let itemStart = `
                <tr>
                <td>${ele._id}</td>
                <td>
                  <div class="img_Product">               
                `;
                let itemEnd = `
                </div>
                </td>
                <td>${ ele.name}</td>
                <td>${ele.prd_key}</td>
                <td>${ele.price}</td>
                <td>${ele.quantity}</td>
                <td><a href="#${ele._id}" class="btn_fix"  onclick="fixProduct('${ele._id}')">Fix</a></td>
                <td><a href="#${ele._id}"  class="btn_delete"  onclick="deleteProduct('${ele._id}')">Delete</a></td>
              </tr>`
                let data = ele.img.map(image=>{
                    return `
                    <img
                    class="img_prd"
                    src="${image}"
                    alt="chua co anh"
                  />
                    `;
                })
                let itemCenter = data.join("")

                let ok = itemStart + itemCenter + itemEnd                             
                $('tbody').append(ok)               
            })
        }
    } catch (error) {
        console.log(error);
    }

}

render()



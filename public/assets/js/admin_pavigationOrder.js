async function render(){
    try {
        const res = await $.ajax({
            url: "/admin/getOrder",
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
            newdata.map((ele, index) =>{
                let item = `
                <tr>
                <td>${index + 1}</td>
                <td>${ele.userId.username} </td>
                <td>${ele.orderDate}</td>
                <td>${ele.address}</td>
                <td>${ele.totalPrice.toLocaleString() + 'đ'}</td>
                <td><span class="status_style">${ele.status}</span></td>
                <td><a href="#${ele._id}" class="btn_fix"  onclick="edit('${ele._id}')">edit</a></td>
                <td><a href="#${ele._id}"  class="btn_delete"  onclick="view('${ele._id}')">view</a></td>
              </tr>
                `;

                             
                $('tbody').append(item)               
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
            url: `/admin/pavigationOrder?page=${page}`,
            type: "GET"
        })
        if(res.status == 200){
            $('tbody').html("") 
            let newdata = res.data
            newdata.map((ele, index) =>{
                let item = `
                <tr>
                <td>${index + 1}</td>
                <td>${ele.userId.username} </td>
                <td>${ele.orderDate}</td>
                <td>${ele.address}</td>
                <td>${ele.totalPrice.toLocaleString() + 'đ'}</td>
                <td><span class="status_style">${ele.status}</span></td>
                <td><a href="#${ele._id}" class="btn_fix"  onclick="edit('${ele._id}')">edit</a></td>
                <td><a href="#${ele._id}"  class="btn_delete"  onclick="view('${ele._id}')">view</a></td>
              </tr>
                `;

                             
                $('tbody').append(item)               
            })
        }
    } catch (error) {
        console.log(error);
    }

}

render()


const abc = document.querySelector(".number").innerHTML
console.log(abc);


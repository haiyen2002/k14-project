async function render(){
    try {
        const res = await $.ajax({
            url: "/admin/getUser",
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
                let item = `
                <tr>
                <td>${ele.username}</td>
                <td><span>******</span></td>
                <td>${ele.firstname}</td>
                <td>${ele.lastname}</td>
                <td>${ele.phone}</td>
                <td>${ele.gender}</td>
                <td>${ele.email}</td>
                <td>${ele.birthday}</td>
                <td>${ele.createdAt}</td>
                <td>${ele.role}</td>
                <td><a href="#${ele._id}" class="btn_delete" onclick="deleteUser('${ele._id}')">Delete</a></td>
                <td><a href="#${ele._id}" class="btn_order"  onclick="checkOrder('${ele._id}')">Order</a></td>
                <td><a href="#${ele._id}" class="btn_role"  onclick="changeRole('${ele._id}')">Role</a></td>
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
            url: `/admin/pavigationUser?page=${page}`,
            type: "GET"
        })
        if(res.status == 200){
            $('tbody').html("") 
            let newdata = res.data
            newdata.map((ele) =>{
                let item = `
                <tr>
                <td>${ele.username}</td>
                <td><span>******</span></td>
                <td>${ele.firstname}</td>
                <td>${ele.lastname}</td>
                <td>${ele.phone}</td>
                <td>${ele.gender}</td>
                <td>${ele.email}</td>
                <td>${ele.birthday}</td>
                <td>${ele.createdAt}</td>
                <td>${ele.role}</td>
                <td><a href="#${ele._id}" class="btn_delete" onclick="deleteUser('${ele._id}')">Delete</a></td>
                <td><a href="#${ele._id}" class="btn_order"  onclick="checkOrder('${ele._id}')">Order</a></td>
                <td><a href="#${ele._id}" class="btn_role"  onclick="changeRole('${ele._id}')">Role</a></td>
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

var x = new Date().toUTCString()

console.log(89, x);

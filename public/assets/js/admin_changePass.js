async function changePass() {
    try {
      const newpass = $("#newpass").val();
      if ((newpass)) {
        const data = await $.ajax({
          url: "/admin/changePass",
          type: "put",
          data: {
            newpass: newpass,
          },
        });
        if (data.status == 200) {
          alert(data.mess);
          window.location.href = ""
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }


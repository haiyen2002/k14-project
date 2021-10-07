async function dangky() {
  try {
    const user = $(".user").val();
    const pass = $(".pass").val();
    const firstName = $(".firstName").val();
    const lastName = $(".lastName").val();
    const Phone = $(".Phone").val();
    const Genner = $(".Genner").val();
    const Email = $(".Email").val();
    const Birthday = $(".Birthday").val();
    const data = await $.ajax({
      url: "/user/dangky",
      type: "post",
      data: {
        user: user,
        pass: pass,
        firstName: firstName,
        lastName: lastName,
        Phone: Phone,
        Genner: Genner,
        Email: Email,
        Birthday: Birthday,
      },
    });
    if (data.status === 200) {
      alert(data.mess);
      window.location.href = "/";
    } else {
      alert(data.mess);
    }
  } catch (error) {
    console.log(error);
  }
}

function setCount(id) {
  $.ajax({
    url: "/product/find",
    type: "post",
    data: {
      id: id,
    },
  })
    .then((data) => {
      let sum = 0;

      sum = parseInt(data.quantity);
      console.log(sum);
      return sum;
    })
    .catch((err) => {
      console.log(err);
    });
}
console.log(setCount("615442625f673c073676a152"));

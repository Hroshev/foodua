//input only number
const onlyNumber = document.querySelectorAll("#onlyNumber");
for (let i = 0; i < onlyNumber.length; i++) {
  const number = onlyNumber[i];

  number.oninput = function () {
      this.value = this.value.replace(/\D/g, "").substr(0, 13);
  };
}
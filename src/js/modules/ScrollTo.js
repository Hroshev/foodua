const header = document.getElementById("header");
header.onclick = () => {
  const goSection = document.querySelector(".modal"); //секция на которую будет переход
  window.scrollTo({
    top: goSection.offsetTop,
    behavior: "smooth",
  });
};
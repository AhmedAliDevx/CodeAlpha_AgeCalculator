const btns = document.querySelectorAll(".bottom-nav-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
const today = new Date();
const formatted = today.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
document.querySelector(".reference-date-value").textContent =
  `Today (${formatted})`;

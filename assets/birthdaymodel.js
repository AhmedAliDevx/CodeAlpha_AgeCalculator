const bdModal = document.getElementById("bdModal");
const bdClose = document.getElementById("bdClose");
const bdBtn = document.getElementById("bdBtn");
const bdAgeEl = document.getElementById("bdAge");

function showBirthdayModal(years) {
  bdAgeEl.textContent =
    years === 0 ? "Welcome to the world!" : `Turning ${years} today.`;

  bdModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function hideBirthdayModal() {
  bdModal.classList.remove("active");
  document.body.style.overflow = "";
}

bdClose.addEventListener("click", hideBirthdayModal);
bdBtn.addEventListener("click", hideBirthdayModal);
bdModal.addEventListener("click", (e) => {
  if (e.target === bdModal) hideBirthdayModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && bdModal.classList.contains("active"))
    hideBirthdayModal();
});

document.querySelector(".calculator-card-btn").addEventListener("click", () => {
  setTimeout(() => {
    const yearResult = document.getElementById("r-year").textContent.trim();
    if (yearResult === "--") return;

    const day = parseInt(document.getElementById("day").value, 10);
    const month = parseInt(document.getElementById("month").value, 10);
    const today = new Date();

    if (day === today.getDate() && month === today.getMonth() + 1) {
      showBirthdayModal(parseInt(yearResult, 10) || 0);
    }
  }, 80);
});

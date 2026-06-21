/* Calculator Js */
const today = new Date();
const formatted = today.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
document.querySelector(".reference-date-value").textContent =
  `Today (${formatted})`;
/* Alert */
const alertCross = document.querySelector(".alert-cross");
const alertMessage = document.querySelector(".alert-content");
const alertBox = document.querySelector(".alert-parent");
alertCross.addEventListener("click", () => {
  alertBox.classList.remove("active");
});
/* All Queries */
let dayInput = document.querySelector(".day-input");
let monthInput = document.querySelector(".month-input");
let yearInput = document.querySelector(".year-input");
let calculateBtn = document.querySelector(".calculator-card-btn");
const resultYear = document.getElementById("r-year");
const resultMonth = document.getElementById("r-month");
const resultDay = document.getElementById("r-day");
const TotalWeeks = document.querySelector(".total-weeks");
const TotalDays = document.querySelector(".total-days");
const TotalHours = document.querySelector(".total-hours");
const daysRemaining = document.getElementById("daysRemaining");
const nextBirthday = document.querySelector(".next-birthday");
/* Calculator Button */
calculateBtn.addEventListener("click", (e) => {
  let day = parseInt(dayInput.value);
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    e.stopPropagation();
    alertBox.classList.add("active");
    alertMessage.textContent = "Please fill in all fields with valid numbers.";
    return;
  }

  if (day < 1 || day > 31) {
    e.stopPropagation();
    alertBox.classList.add("active");
    alertMessage.textContent = "Please enter a valid day (1-31).";
    return;
  }
  if (month < 1 || month > 12) {
    e.stopPropagation();
    alertBox.classList.add("active");
    alertMessage.textContent = "Please enter a valid month (1-12).";
    return;
  }
  if (year < 1900 || year > today.getFullYear()) {
    e.stopPropagation();
    alertBox.classList.add("active");
    alertMessage.textContent = `Please enter a valid year (1900-${today.getFullYear()}).`;
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  if (birthDate.getDate() !== day) {
    alertBox.classList.add("active");
    alertMessage.textContent = `That date doesn't exist.`;
    return;
  }
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!hasHadBirthday) age--;
  let years = today.getFullYear() - birthDate.getFullYear();
  if (!hasHadBirthday) years--;
  let months = today.getMonth() - birthDate.getMonth();
  if (months < 0) months += 12;
  let days = today.getDate() - birthDate.getDate();
  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
  }
  console.log(years, months, days);

  resultYear.textContent = years;
  resultMonth.textContent = months;
  resultDay.textContent = days;

  const DiffMs = today - birthDate;
  const TotalD = Math.floor(DiffMs / (1000 * 60 * 60 * 24));
  const TotalW = Math.floor(TotalD / 7);
  const TotalH = Math.floor(DiffMs / (1000 * 60 * 60));
  TotalWeeks.textContent = TotalW;
  TotalDays.textContent = TotalD;
  TotalHours.textContent = TotalH;

  /* Next Birthday */
  let nextBd = new Date(
    today.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate(),
  );

  if (nextBd <= today) {
    nextBd = new Date(
      today.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate(),
    );
  }

  const daysLeft = Math.ceil((nextBd - today) / (1000 * 60 * 60 * 24));

  const lastBd = new Date(
    nextBd.getFullYear() - 1,
    birthDate.getMonth(),
    birthDate.getDate(),
  );
  const totalSpan = nextBd - lastBd;
  const elapsed = today - lastBd;
  const progress = (elapsed / totalSpan) * 100;

  const formattedNextBd = nextBd.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  console.log(nextBirthday);
  console.log(formattedNextBd);
  daysRemaining.textContent = daysLeft;
  nextBirthday.textContent = formattedNextBd;
  document.querySelector(".next-bd-progress").style.width = `${progress}%`;
});
const commonDates = document.querySelectorAll(".dates");
commonDates.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = btn.textContent.trim();
    if (value === "Today") {
      yearInput.value = today.getFullYear();
      monthInput.value = today.getMonth() + 1;
      dayInput.value = today.getDate();
    } else {
      yearInput.value = value;
    }
  });
});
/* Document Remove Alert Container */
document.body.addEventListener("click", (e) => {
  alertBox.classList.remove("active");
});

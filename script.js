const calculate = document.getElementById("calculate");

calculate.addEventListener("click", () => {
  // get inputs
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  const birthDate = new Date(`${year}-${month}-${day}`);
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const currentDate = new Date();

  //   validate inputs
  const form = document.getElementById("form");
  clearErrorMessages();

  if (birthDate > new Date()) {
    displayErrorMessage("Birthdate cannot be in the future.");
    return;
  }

  if (day == "" || month == "" || year == "") {
    displayErrorMessage("Birthdate is required.");
    return;
  }

  if (day < 1 || day > 31) {
    displayErrorMessage("Day must be between 1 and 31.");
    return;
  }

  if (month < 1 || month > 12) {
    displayErrorMessage("Month must be between 1 and 12.");
    return;
  }

  const maxDaysInMonth = new Date(year, month, 0).getDate();
  if (day > maxDaysInMonth) {
    displayErrorMessage(
      `Must be a valid date. ${month}/${year} has ${maxDaysInMonth} days.`
    );
    return;
  }

  function displayErrorMessage(message) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = message;
    form.appendChild(errorElement);

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.add("input-error");
    });

    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.classList.add("label-error");
    });
  }

  function clearErrorMessages() {
    const errorElements = form.querySelectorAll(".error");
    errorElements.forEach((errorElement) => {
      errorElement.remove();
    });

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.classList.remove("input-error");
    });

    const labels = document.querySelectorAll("label");
    labels.forEach((label) => {
      label.classList.remove("label-error");
    });
  }

  //   calculate outputs
  const dateDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(dateDiffMs);

  const yearsOutput = Math.abs(ageDate.getUTCFullYear() - 1970);
  let monthsOutput = currentMonth - month;
  monthsOutput = monthsOutput < 0 ? monthsOutput + 12 : monthsOutput;
  let daysOutput = currentDay - day;
  daysOutput = daysOutput < 0 ? daysOutput + 30 : daysOutput;
  document.getElementById("result-years").innerText = yearsOutput;
  document.getElementById("result-months").innerText = monthsOutput;
  document.getElementById("result-days").innerText = daysOutput;
});

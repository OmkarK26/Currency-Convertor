const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from");
const toCurr = document.querySelector(".to");
const msg = document.querySelector(".msg");

// Dummy data for demonstration purpose
const countryList = {
  USD: "United States Dollar",
  INR: "Indian Rupee"
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode; // corrected from countryList[currCode]
    option.innerText = countryList[currCode];
    if (select.name === "from" && currCode === "USD") {
      option.selected = true; // corrected from newOption.selected
    } else if (select.name === "to" && currCode === "INR") {
      option.selected = true; // corrected from newOption.selected
    }
    select.appendChild(option);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode.toLowerCase()}/flat/64.png`; // corrected from newSrc = `<img src="https://flagsapi.com/:{country_code}/:style/:size.png">`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

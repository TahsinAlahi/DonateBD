let balanceEl = document.getElementById("balance");
const donationBtns = document.getElementsByClassName("donateBtn");
const historyPage = document.getElementById("historyPage");
const donationPage = document.getElementById("donationPage");
let history = [];

const donatePageBtn = document.getElementById("donatePageBtn");
const historyPageBtn = document.getElementById("historyPageBtn");

function handlePageToggle(e) {
  if (
    donatePageBtn.classList.contains("active") &&
    e.target.id === "historyPageBtn"
  ) {
    donatePageBtn.classList.replace("active", "inactive");
    historyPageBtn.classList.replace("inactive", "active");
  } else if (
    historyPageBtn.classList.contains("active") &&
    e.target.id === "donatePageBtn"
  ) {
    historyPageBtn.classList.replace("active", "inactive");
    donatePageBtn.classList.replace("inactive", "active");
  }

  if (donatePageBtn.classList.contains("active")) {
    donationPage.classList.remove("hidden");
    historyPage.classList.add("hidden");
  } else {
    donationPage.classList.add("hidden");
    historyPage.classList.remove("hidden");
  }
}

function historyLoad(donateAmount, title) {
  const newData = {
    title,
    amount: donateAmount,
    donatingTime: new Date(),
  };

  history = [...history, newData];

  addHistoryItem(newData);
}

function handleDonate(e) {
  let card = e.target.parentNode;
  let totalDonatedEl = card.querySelector("span");
  let donateAmountEl = card.querySelector("input");

  let title = card.querySelector("h2").innerText;
  let totalDonated = parseInt(totalDonatedEl.innerText);
  let donateAmount = parseInt(donateAmountEl.value);
  let balance = parseInt(balanceEl.innerText);

  if (balance - donateAmount <= 0) return;

  historyLoad(donateAmount, title);
  balanceEl.innerText = balance - donateAmount;
  totalDonatedEl.innerText = totalDonated + donateAmount;
  // donateAmountEl.value = "";
}

for (let donateBtn of donationBtns) {
  donateBtn.addEventListener("click", handleDonate);
}

function addHistoryItem(historyObj) {
  const div = document.createElement("div");
  div.classList.add("p-8", "border", "border-gray-300", "rounded-lg");
  const element = `<h2 class="font-bold text-xl mb-4 text-black">
            ${historyObj.amount} Taka is Donated for ${historyObj.title}
          </h2>
          <p class="text-gray-700">
            Date : ${historyObj.donatingTime}
          </p>`;
  div.innerHTML = element;
  historyPage.appendChild(div);
}

donatePageBtn.addEventListener("click", handlePageToggle);
historyPageBtn.addEventListener("click", handlePageToggle);

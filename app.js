// elements
let balanceEl = document.getElementById("balance");

// pages
const historyPage = document.getElementById("historyPage");
const donationPage = document.getElementById("donationPage");

//buttons
const donationBtns = document.getElementsByClassName("donateBtn");
const donatePageBtn = document.getElementById("donatePageBtn");
const historyPageBtn = document.getElementById("historyPageBtn");

// handle page toggle between history and donation
function handlePageToggle(e) {
  // toggle active inactive
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

  // make the page hidden or visible
  if (donatePageBtn.classList.contains("active")) {
    donationPage.classList.remove("hidden");
    historyPage.classList.add("hidden");
  } else {
    donationPage.classList.add("hidden");
    historyPage.classList.remove("hidden");
  }
}

//load the history in ui
function historyLoad(donateAmount, title) {
  const newData = {
    title,
    amount: donateAmount,
    donatingTime: new Date(),
  };

  addHistoryItem(newData);
}

// handle the donation button click event
function handleDonate(e) {
  // card elements
  let card = e.target.parentNode;
  let totalDonatedEl = card.querySelector("span");
  let donateAmountEl = card.querySelector("input");

  // card values
  let title = card.querySelector("h2").innerText;
  let totalDonated = parseInt(totalDonatedEl.innerText);
  let donateAmount = parseInt(donateAmountEl.value);
  let balance = parseInt(balanceEl.innerText);

  // letter, empty value gives error
  //and stops the donation process
  if (
    isNaN(donateAmount) ||
    donateAmount === "" ||
    balance - donateAmount <= 0
  ) {
    alert("Please Input A Valid Amount");
    return;
  }

  //load the history
  historyLoad(donateAmount, title);

  // updates the value in ui
  balanceEl.innerText = balance - donateAmount;
  totalDonatedEl.innerText = totalDonated + donateAmount;
  donateAmountEl.value = "";

  // this is for showing modal from daisy ui
  my_modal_1.showModal();
}

// make a card for the historyPage
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

for (let donateBtn of donationBtns) {
  donateBtn.addEventListener("click", handleDonate);
}

donatePageBtn.addEventListener("click", handlePageToggle);
historyPageBtn.addEventListener("click", handlePageToggle);

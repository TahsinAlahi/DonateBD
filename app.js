let balanceEl = document.getElementById("balance");
let donationBtns = document.getElementsByClassName("donateBtn");
let history = [];

function historyLoad(donateAmount, title) {
  const newData = {
    title,
    amount: donateAmount,
    donatingTime: new Date(),
  };

  history = [...history, newData];

  console.log(history);
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
  // donateBtn.click();
}

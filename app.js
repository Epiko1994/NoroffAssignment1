const balanceElement = document.getElementById("balance-paragraph");
const loanButtonElement = document.getElementById("get-a-loan-button");
const payElement = document.getElementById("pay-paragraph");
const bankMoneyButtonElement = document.getElementById("bank-money-button");
const doWorkButtonElement = document.getElementById("do-work-button");
const repayLoanButtonElement = document.getElementById("repay-loan-button");
const laptopsElement = document.getElementById("laptops-dropdown");
const computerFeatureListElement = document.getElementById("computer-feature-list");

let computers = [];
let pay = 0;
let balance = 0;
let haveLoan = false;


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));

const handleLoan = () => {
    const loanAmount = prompt("Please enter the amount you would like to loan");
    if(loanAmount <= balance * 2 && haveLoan === false) {
        balanceElement.innerText = `Balance: ${parseInt(loanAmount) + balance}`;
        balance = parseInt(loanAmount) + balance;
        haveLoan = true;
    } else {
        alert("We can not approve that loan, sorry");
    }
}

const handleWork = () => {
    payElement.innerText = `Pay: ${pay + 100}`
    pay = pay + 100;
}

const handleBankPay = () => {
    balanceElement.innerText = `Balance: ${balance + pay}`
    balance = balance + pay;
    payElement.innerText = `Pay: ${pay - pay}`
    pay = pay - pay;

}
 
const addComputersToMenu = (computers) => {
    computers.forEach(computer => addComputerToMenu(computer));
}
    
const addComputerToMenu = (computer) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = computer.id;
    laptopElement.appendChild(document.createTextNode(computer.title));
    laptopsElement.appendChild(laptopElement);
}

bankMoneyButtonElement.addEventListener("click", handleBankPay);
doWorkButtonElement.addEventListener("click", handleWork);
loanButtonElement.addEventListener("click", handleLoan);
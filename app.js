const balanceElement = document.getElementById("balance-paragraph");
const loanButtonElement = document.getElementById("get-a-loan-button");
const payElement = document.getElementById("pay-paragraph");
const bankMoneyButtonElement = document.getElementById("bank-money-button");
const doWorkButtonElement = document.getElementById("do-work-button");
const repayLoanButtonElement = document.getElementById("repay-loan-button-element");
const laptopsElement = document.getElementById("laptops-dropdown");
const computerFeatureListElement = document.getElementById("computer-feature-list");

let computers = [];
let pay = 0;
let balance = 0;
let haveLoan = false;
let loanAmount = 0;



fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));

    //Calls the addComputerToMenu function for every element in the computers array
const addComputersToMenu = (computers) => {
    computers.forEach(computer => addComputerToMenu(computer));
}

//Creates and option in the laptop dropdown and adds the current laptop from the computers array to that option
const addComputerToMenu = (computer) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = computer.id;
    laptopElement.appendChild(document.createTextNode(computer.title));
    laptopsElement.appendChild(laptopElement);
}

//Handles the work button functionality
const handleWork = () => {
    payElement.innerText = `Pay: ${pay + 100}`
    pay = pay + 100;
}

//Handles the Bank button functionality
const handleBankPay = () => {
    balanceElement.innerText = `Balance: ${parseInt(balance) + parseInt(pay)}`
    balance = balance + pay;
    payElement.innerText = `Pay: ${parseInt(pay) - parseInt(pay)}`
    pay = pay - pay;
}

//Handles the Get a Loan button functionality
const handleLoan = () => {
    const loanAmount = prompt("Please enter the amount you would like to loan",100);
    if(loanAmount <= balance * 2 && haveLoan === false) {
        balanceElement.innerText = `Balance: ${parseInt(loanAmount) + parseInt(balance)}`;
        balance = loanAmount + balance;
        
        haveLoan = true;

        const repayLoanButton = document.createElement("button");
        repayLoanButton.innerText = `Repay Loan`
        repayLoanButtonElement.appendChild(repayLoanButton);
    } else {
        alert("We can not approve that loan, sorry");
    }
}

const handleLoanRepayment = () => {
    if(balance >= loanAmount) {
        balance = balance - loanAmount;
        balanceElement.innerText = `Balance: ${parseInt(balance) - parseInt(loanAmount)}`;
        loanAmount = loanAmount - loanAmount;
        repayLoanButtonElement.removeChild(repayLoanButton);

        haveLoan = false;
    } else {
        alert("You do not have enough money to pay off your loan")
    }
}

repayLoanButtonElement.addEventListener("click", handleLoanRepayment);
bankMoneyButtonElement.addEventListener("click", handleBankPay);
doWorkButtonElement.addEventListener("click", handleWork);
loanButtonElement.addEventListener("click", handleLoan);
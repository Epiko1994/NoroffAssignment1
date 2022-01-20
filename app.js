const balanceElement = document.getElementById("balance-paragraph");
const loanButtonElement = document.getElementById("get-a-loan-button");
const payElement = document.getElementById("pay-paragraph");
const bankMoneyButtonElement = document.getElementById("bank-money-button");
const doWorkButtonElement = document.getElementById("do-work-button");
const repayLoanButtonElement = document.getElementById("repay-loan-button-element");
const laptopsElement = document.getElementById("laptops-dropdown");
const computerFeaturesListElement = document.getElementById("computer-feature-list");
const laptopTitleElement = document.getElementById("laptop-title");
const laptopDescriptionElement = document.getElementById("laptop-description");
const laptopPriceElement = document.getElementById("laptop-price");
const laptopImageElement = document.getElementById("laptop-image");
const buyNowButtonElement = document.getElementById("buy-now-button");

let computers = [];
let pay = 0;
let balance = 0;
let loanAmount = 0;
let haveLoan = false;
let repayLoanButton;
let selectedLaptop = computers[0];
let buyer = {};


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToMenu(computers));

    //Calls the addComputerToMenu function for every element in the computers array
const addComputersToMenu = (computers) => {
    computers.forEach(computer => addComputerToMenu(computer));
    
    computerFeaturesListElement.innerText = computers[0].specs;
    
    laptopTitleElement.innerText = computers[0].title;
    
    laptopDescriptionElement.innerText = computers[0].description;
    
    laptopPriceElement.innerText = `${computers[0].price} NOK`;

    const laptopImageAttribute = document.createAttribute("src");
    laptopImageAttribute.value = `https://noroff-komputer-store-api.herokuapp.com/${computers[0].image}`;
    laptopImageElement.setAttributeNode(laptopImageAttribute);
    return buyer.currentlyLookingAtPrice = `${computers[0].price}`
}

//Creates and option in the laptop dropdown and adds the current laptop from the computers array to that option
const addComputerToMenu = (computer) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = computer.id;
    laptopElement.appendChild(document.createTextNode(computer.title));
    laptopsElement.appendChild(laptopElement);
}

const handleLaptopMenuChange = event => {
    selectedLaptop = computers[event.target.selectedIndex];
    
    computerFeaturesListElement.innerText = selectedLaptop.specs;

    const laptopImageAttribute = document.createAttribute("src");
    laptopImageAttribute.value = `https://noroff-komputer-store-api.herokuapp.com/${selectedLaptop.image}`;
    laptopImageElement.setAttributeNode(laptopImageAttribute);

    laptopTitleElement.innerText = selectedLaptop.title;
    laptopDescriptionElement.innerText = selectedLaptop.description;
    laptopPriceElement.innerText = `${selectedLaptop.price} NOK`;
    return buyer.currentlyLookingAtPrice = `${selectedLaptop.price}`;
}

//Handles the work button functionality
const handleWork = () => {
    payElement.innerText = `Pay: ${pay + 100}`;
    pay += 100;
}

//Handles the Bank button functionality
const handleBankPay = () => {
    let percentageOffPay = pay * 0.1
    if(haveLoan === true && percentageOffPay <= loanAmount) {
        balance += pay * 0.9;
        loanAmount -= percentageOffPay;
        pay -= pay;
        balanceElement.innerText = `Balance: ${parseInt(balance)}`
        payElement.innerText = `Pay: ${parseInt(pay)}`;
    } else if(haveLoan === true && percentageOffPay > loanAmount) {
        loanAmount -= percentageOffPay;
        loanAmount = Math.abs(loanAmount);
        balance += pay * 0.9 + loanAmount;
        loanAmount = 0;
        pay -= pay;
        balanceElement.innerText = `Balance: ${parseInt(balance)}`
        payElement.innerText = `Pay: ${parseInt(pay)}`;
        } else {
        balance += pay;
        pay = pay - pay;
        balanceElement.innerText = `Balance: ${parseInt(balance)}`;
        payElement.innerText = `Pay: ${parseInt(pay)}`;
    }
    if(loanAmount === 0) {
        repayLoanButtonElement.removeChild(repayLoanButton);
        haveLoan = false;
    }
}

//Handles the Get a Loan button functionality
const handleLoan = () => {
    loanAmount = prompt("Please enter the amount you would like to loan",100);
    if(loanAmount <= balance * 2 && haveLoan === false) {
        balance = parseInt(loanAmount) + balance;
        balanceElement.innerText = `Balance: ${parseInt(balance)}`;
        
        haveLoan = true;

        repayLoanButton = document.createElement("button");
        repayLoanButton.innerText = `Repay Loan`;
        repayLoanButtonElement.appendChild(repayLoanButton);
    } else {
        alert("We can not approve that loan, sorry");
    }
}

const handleLoanRepayment = () => {
    if(balance >= loanAmount) {
        balance -= parseInt(loanAmount);
        loanAmount -= parseInt(loanAmount);
        balanceElement.innerText = `Balance: ${parseInt(balance)}`;
        repayLoanButtonElement.removeChild(repayLoanButton);

        haveLoan = false;
    } else {
        alert("You do not have enough money to pay off your loan");
    }
}

const handleBuyNow = () => {
    let laptopPrice = parseInt(buyer.currentlyLookingAtPrice);
    if(balance >= parseInt(laptopPrice)) {
        balance -= parseInt(laptopPrice);
        balanceElement.innerText = `Balance: ${parseInt(balance)}`
        alert("Thank you for your purchase");
    } else {
        alert("You do not have enough money to buy that!")
    }
}

// const handleFeatureListSplit = (computers) => {
//     let computerFeaturesArray = computers.specs.split(",");
//     for (let index = 0; index < computerFeaturesArray.length; index++) {
//         let computerFeature = document.createElement("li")
//         computerFeature.innerText = `${computerFeaturesArray[index]}`;
//         computerFeaturesListElement.appendChild(computerFeature);
//     }
// }

laptopsElement.addEventListener("change", handleLaptopMenuChange);
repayLoanButtonElement.addEventListener("click", handleLoanRepayment);
bankMoneyButtonElement.addEventListener("click", handleBankPay);
doWorkButtonElement.addEventListener("click", handleWork);
loanButtonElement.addEventListener("click", handleLoan);
buyNowButtonElement.addEventListener("click", handleBuyNow);
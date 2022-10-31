const bill = document.getElementById("bill");
const customTip = document.getElementById("tip-percent");
const buttons = document.querySelectorAll(".btn");
const people = document.getElementById("people");
const tipByPerson = document.getElementById("tip-amount");
const totalByPerson = document.getElementById("total-tip-amount");
const error = document.getElementById("error");
const reset = document.querySelector(".reset");

//declaring required value as 0
let tipVal = 0;
let billVal = 0;
let peopleVal = 0;

// adding event listners for all input and buttons
bill.addEventListener("input", validateBill);
people.addEventListener("input", validatePeople);
customTip.addEventListener("input", customTipVal);
buttons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
reset.addEventListener("click", handleReset);

// function to handle button click on percentage button
function handleClick(event) {
  //using forEach to disable all btn classlist
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    //if btn is clicked its target value wil be same as btn.value
    if (event.target.value === btn.value) {
      //removing classlist from btn
      btn.classList.add("active");
      tipVal = btn.value / 100;
    }
  });
  calculate();
}

//validating people count
function validatePeople() {
  peopleVal = people.value;
  //if peopleVal is less than zero then display error and input border as red
  if (peopleVal <= 0) {
    error.textContent = "Can't be zero";
    people.style.borderColor = "red";
    //timeout function to clear error and border after 2 seconds
    setTimeout(function () {
      error.textContent = "";
      people.style.borderColor = "";
    }, 2000);
  }
  calculate();
}

//getting billVal from bill input
function validateBill() {
  billVal = bill.value;
}

//calculating customtip and converting it to percentage
function customTipVal() {
  //using foreach to remove classlist
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  tipVal = customTip.value / 100;
  calculate();
}

//calculate function to change innerhtml of tip and total value
function calculate() {
  //this will execute only if peopleVal is greater or equal to 1
  if (peopleVal >= 1) {
    let tip = (billVal * tipVal) / peopleVal;
    let total = tip + billVal / peopleVal;
    //changing textContent of tip-section
    tipByPerson.textContent = "₹" + tip.toFixed(2);
    totalByPerson.textContent = "₹" + total.toFixed(2);
  }
}

//function to handle form reset
function handleReset() {
  //changing value to 0 for variables and empty incase of input fields
  tipVal = 0;
  billVal = 0;
  bill.value = "";
  customTip.value = "";
  people.value = "";
  //setting textContent as ₹0.00
  tipByPerson.textContent = "₹0.00";
  totalByPerson.textContent = "₹0.00";
  //removing active class of btn
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

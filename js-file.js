const numberButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll(".operatorButtons");
const equalButton = document.querySelector(".equalButton");
const clearButton = document.querySelector(".clearButton");
const undoButton = document.querySelector(".undoButton");
let numTmp;
let currentNum;
let oldNum = [];
let currentOperator;
let finalOperators = [];
let equalVar;
let clearVar;
let res;
let lastPressed = "";
let actualValue;

numberButtons.forEach(element => {
    element.addEventListener("click", () => {
        if(lastPressed == "number"){
            currentNum += element.textContent;
        }else{
            currentNum = element.textContent;
        }
        numTmp = element.textContent;
        actualValue = element.textContent;            
        
        displayNum(numTmp);
        lastPressed = "number";
    });
});

operationButtons.forEach(element => {
    element.addEventListener("click", () => {              
        currentOperator = element.textContent;
        lastPressed = "operator";
        finalOperators.push(currentOperator);
        displayNum(currentOperator);
        oldNum.push(currentNum);
        actualValue = element.textContent;
    });
});

equalButton.addEventListener("click", () => {              
    equalVar = equalButton.textContent;
    lastPressed = "equal";
    displayNum(equalVar);
    oldNum.push(currentNum);
    operate(finalOperators,oldNum);
});

clearButton.addEventListener("click", () => {              
    clearVar = clearButton.textContent;
    lastPressed = "clear";
    displayNum(clearVar);
    numTmp = undefined;
    currentNum = undefined;
    oldNum = [];
    currentOperator = undefined;
    finalOperators = [];
    equalVar = undefined;
    clearVar = "";
    res = undefined;
    lastPressed = "";
    actualValue = undefined;
});

undoButton.addEventListener("click", () =>{
    if(isNaN(parseInt(actualValue)) == true){
        displayNum("undo");
        updateArrays("operator");
    }else{
        displayNum("undo");
        updateArrays("numbers");
    }
    console.log(finalOperators);
    console.log(oldNum);
});

function updateArrays(inputInfo){
    if(inputInfo == "operator"){
        finalOperators.pop();
    }else{
        currentNum = currentNum.substring(0, currentNum.length - 1);
    }
};

function displayNum(num){
    const myDisplay = document.querySelector(".display");
    let currentDisplayValue = myDisplay.textContent;
    console.log(lastPressed);
    if(num == "CLEAR"){
        myDisplay.innerHTML = "";    
    }else if(num == "undo"){
        currentDisplayValue = currentDisplayValue.substring(0, currentDisplayValue.length - 1);
        myDisplay.innerHTML = currentDisplayValue;
    }else{
        if(lastPressed == "number"){
            currentDisplayValue += num;
            myDisplay.innerHTML = currentDisplayValue;
        }else{
            currentDisplayValue += " ";
            currentDisplayValue += num;
            myDisplay.innerHTML = currentDisplayValue;
        }
    }
}

// The solution does not take careof priority between operations (ex: multiply is not executed befor add)
// The solution evaluate the operation between two numbers each time
function operate(operators, numbers){
    let len = operators.length;
    let i = 0;
    let tmpResult = 0;
    console.log(finalOperators);
    console.log(oldNum);
    for(i = 0; i < len; i ++){
        if(i == 0){
            if(operators[i] == "+"){
                res = add(numbers[i],numbers[i + 1]);
            }else if(operators[i] == "-"){
                res = subtract(numbers[i],numbers[i + 1]);
            }else if(operators[i] == "x"){
                res = multiply(numbers[i],numbers[i + 1]);
            }if(operators[i] == ":"){
                res = divide(numbers[i],numbers[i + 1]);
            }
            tmpResult = res;
        }else{
            if(operators[i] == "+"){
                res = add(tmpResult,numbers[i + 1]);
            }else if(operators[i] == "-"){
                res = subtract(tmpResult,numbers[i + 1]);
            }else if(operators[i] == "x"){
                res = multiply(tmpResult,numbers[i + 1]);
            }if(operators[i] == ":"){
                res = divide(tmpResult,numbers[i + 1]);
            }
            tmpResult = res;
        }
    }
    displayNum(res.toFixed(2));
}

function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2){
    if(num2 == 0){
        alert("The division by 0 is not allowed");
    }
    return parseFloat(num1) / parseFloat(num2);
}


// Obtener los elementos del DOM
const result = document.getElementById("result");
const keys = document.querySelectorAll(".key");

// Variables para almacenar los valores y la operación
let firstValue = "";
let secondValue = "";
let operation = "";

// Función para actualizar el display
const updateDisplay = (value) => {
  if (result.textContent === "0" || result.textContent === "Error") {
    result.textContent = value;
  } else {
    result.textContent += value;
  }
};

// Función para limpiar el display
const clearDisplay = () => {
  result.textContent = "0";
  firstValue = "";
  secondValue = "";
  operation = "";
};

// Función para realizar el cálculo
const calculate = () => {
  let resultValue;
  switch (operation) {
    case "+":
      resultValue = parseFloat(firstValue) + parseFloat(secondValue);
      break;
    case "-":
      resultValue = parseFloat(firstValue) - parseFloat(secondValue);
      break;
    case "*":
      resultValue = parseFloat(firstValue) * parseFloat(secondValue);
      break;
    case "/":
      if (secondValue === "0") {
        resultValue = "Error";
      } else {
        resultValue = parseFloat(firstValue) / parseFloat(secondValue);
      }
      break;
    default:
      resultValue = "Error";
  }
  result.textContent = resultValue;
  firstValue = resultValue;
  secondValue = "";
  operation = "";
};

// Añadir evento click a cada tecla
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.getAttribute("data-value");
    if (!isNaN(value) || value === ".") {
      // Si es un número o un punto decimal
      if (operation) {
        // Si hay una operación seleccionada, se asigna el valor al segundo operando
        secondValue += value;
        updateDisplay(value);
      } else {
        // Si no hay operación seleccionada, se asigna el valor al primer operando
        firstValue += value;
        updateDisplay(value);
      }
    } else if (value === "clear") {
      // Si es la tecla de limpiar
      clearDisplay();
    } else if (value === "=") {
      // Si es la tecla de igual
      calculate();
    } else {
      // Si es una tecla de operador
      if (!firstValue) {
        // Si no hay primer operando, no se hace nada
        return;
      } else if (firstValue && !operation) {
        // Si hay primer operando y no hay operación, se asigna la operación
        operation = value;
        updateDisplay(value);
      } else if (firstValue && operation && secondValue) {
        // Si hay primer operando, operación y segundo operando, se realiza el cálculo y se asigna la nueva operación
        calculate();
        operation = value;
        updateDisplay(value);
      }
    }
  });
});

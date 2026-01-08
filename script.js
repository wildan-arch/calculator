let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;
// panggil display elements
const currentDisplay = document.getElementById("current-operand");
const previousDisplay = document.getElementById("previous-operand");

// Fungsi menambah angka ke layar
function appendNumber(number) {
  if (currentInput === "0" || shouldResetScreen) {
    currentInput = number;
    shouldResetScreen = false;
  } else {
    // Mencegah titik desimal ganda
    if (number === "." && currentInput.includes(".")) return;
    currentInput += number;
  }
  updateDisplay();
}

// Fungsi memilih operator (+, -, *, /)
function appendOperator(op) {
  if (operator !== null) compute();
  previousInput = currentInput;
  operator = op;
  shouldResetScreen = true;
  updateDisplay();
}
// Fungsi menghapus semua (AC)
function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  updateDisplay();
}

// Fungsi menghapus satu karakter terakhir (Backspace)
function deleteNumber() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

// Fungsi menghitung hasil (=)
function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  operator = null;
  previousInput = "";
  shouldResetScreen = true;
  updateDisplay();
}

// Fungsi memperbarui tampilan layar
function updateDisplay() {
  currentDisplay.innerText = currentInput;
  if (operator != null) {
    previousDisplay.innerText = `${previousInput} ${operator}`;
  } else {
    previousDisplay.innerText = "";
  }
}

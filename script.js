// Mendapatkan elemen display
const display = document.getElementById("display");

// Variabel untuk melacak status kalkulator
let isResultDisplayed = false;

// Fungsi untuk menambahkan nilai ke display
function appendToDisplay(value) {
  // Jika hasil sedang ditampilkan dan pengguna menekan angka, reset display
  if (isResultDisplayed && !isOperator(value)) {
    display.value = "";
    isResultDisplayed = false;
  }

  // Jika hasil sedang ditampilkan dan pengguna menekan operator, lanjutkan dengan hasil
  if (isResultDisplayed && isOperator(value)) {
    isResultDisplayed = false;
  }

  // Tambahkan nilai ke display
  display.value += value;
}

// Fungsi untuk memeriksa apakah nilai adalah operator
function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

// Fungsi untuk mengosongkan display
function clearDisplay() {
  display.value = "";
  isResultDisplayed = false;
}

// Fungsi untuk menghitung hasil
function calculateResult() {
  try {
    // Evaluasi ekspresi matematika
    const result = eval(display.value);

    // Tampilkan hasil
    display.value = result;
    isResultDisplayed = true;
  } catch (error) {
    // Jika terjadi error, tampilkan pesan error
    display.value = "Error";
    isResultDisplayed = true;
  }
}

// Event listener untuk keyboard
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Tombol angka
  if (key >= "0" && key <= "9") {
    appendToDisplay(key);
  }
  // Tombol operator
  else if (["+", "-", "*", "/"].includes(key)) {
    appendToDisplay(key);
  }
  // Tombol titik desimal
  else if (key === ".") {
    appendToDisplay(".");
  }
  // Tombol enter atau sama dengan
  else if (key === "Enter" || key === "=") {
    calculateResult();
  }
  // Tombol escape atau C untuk clear
  else if (key === "Escape" || key === "c" || key === "C") {
    clearDisplay();
  }
  // Tombol backspace
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});

// Fungsi untuk mengoreksi entri terakhir
function correctLastEntry() {
  display.value = display.value.slice(0, -1);
}

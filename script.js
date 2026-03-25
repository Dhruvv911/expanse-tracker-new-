let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = 5000;

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (!amount) return;

  expenses.push({
    id: Date.now(),
    amount: parseInt(amount),
    category
  });

  localStorage.setItem("expenses", JSON.stringify(expenses));
  document.getElementById("amount").value = "";

  showData();
}

// 🎤 Voice
function startVoice() {
  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";

  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    let amount = text.match(/\d+/);

    if (amount) {
      document.getElementById("amount").value = amount[0];
    }
  };

  recognition.start();
}

// 📊 Show Data
function showData() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;
  let categoryTotal = {};

  expenses.forEach(e => {
    total += e.amount;

    if (!categoryTotal[e.category]) categoryTotal[e.category] = 0;
    categoryTotal[e.category] += e.amount;

    let li = document.createElement("li");
    li.innerHTML = `₹${e.amount} - ${e.category}
    <button onclick="del(${e.id})">X</button>`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
  document.getElementById("today").innerText = total;
  document.getElementById("left").innerText = budget - total;

  if (total > budget) {
    alert("⚠️ Budget Cross Ho Gaya!");
  }

  showAnalytics(categoryTotal);
}

// ❌ Delete
function del(id) {
  expenses = expenses.filter(e => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showData();
}

// 📈 Graph
function showAnalytics(data) {
  let div = document.getElementById("analytics");
  div.innerHTML = "<h3>📊 Spending</h3>";

  let max = Math.max(...Object.values(data), 1);

  for (let cat in data) {
    let percent = (data[cat] / max) * 100;

    div.innerHTML += `
      <p>${cat}: ₹${data[cat]}</p>
      <div class="bar" style="width:${percent}%"></div>
    `;
  }
}

// 📱 Navbar switch (simple)
function showSection(type) {
  if (type === "home") {
    alert("🏠 Home Screen");
  } else {
    alert("📊 Stats Screen");
  }
}

showData();

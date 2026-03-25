let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  if (amount === "") return;

  let expense = {
    id: Date.now(),
    amount: parseInt(amount),
    category: category
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("amount").value = "";

  showExpenses();
}

function showExpenses() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    let li = document.createElement("li");
    li.innerHTML = `₹${exp.amount} - ${exp.category} 
    <button onclick="deleteExpense(${exp.id})">❌</button>`;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;

  showAnalytics();
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

function showAnalytics() {
  let categoryTotal = {};

  expenses.forEach(exp => {
    if (!categoryTotal[exp.category]) {
      categoryTotal[exp.category] = 0;
    }
    categoryTotal[exp.category] += exp.amount;
  });

  let analytics = document.getElementById("analytics");
  analytics.innerHTML = "<h3>📊 Category Breakdown</h3>";

  for (let cat in categoryTotal) {
    analytics.innerHTML += `<p>${cat}: ₹${categoryTotal[cat]}</p>`;
  }
}

showExpenses();

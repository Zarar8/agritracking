// scripts.js

// Google Sheets API endpoint
const SHEET_ID = '2PACX-1vQsGjzhRHqkEHZ7Q_zpF7Bty-eldcSXyKtyWUFmBTFyVV3Amm6QbHW7nR5vEQwcKmdRR-b_l28XU5bD';
const API_KEY = '418289000009-u4kqg78c0o204hkpiceoq2su1v4qhoq6.apps.googleusercontent.com';
const SHEET_NAME = 'expenses';

// Function to add expenses to Google Sheets
function addExpense(category, amount) {
    const url = https://sheets.googleapis.com/v4/spreadsheets/${2PACX-1vQsGjzhRHqkEHZ7Q_zpF7Bty-eldcSXyKtyWUFmBTFyVV3Amm6QbHW7nR5vEQwcKmdRR-b_l28XU5bD}/values/${expenses}:append?valueInputOption=USER_ENTERED&key=${418289000009-u4kqg78c0o204hkpiceoq2su1v4qhoq6.apps.googleusercontent.com};
    const data = {
        values: [[category, amount, new Date().toLocaleString()]]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add expense.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Expense added successfully:', data);
        fetchExpenses(); // Refresh expenses table
    })
    .catch(error => {
        console.error('Error adding expense:', error);
    });
}

// Function to fetch expenses from Google Sheets
function fetchExpenses() {
    const url = https://sheets.googleapis.com/v4/spreadsheets/${2PACX-1vQsGjzhRHqkEHZ7Q_zpF7Bty-eldcSXyKtyWUFmBTFyVV3Amm6QbHW7nR5vEQwcKmdRR-b_l28XU5bD}/values/${expenses}?key=${418289000009-u4kqg78c0o204hkpiceoq2su1v4qhoq6.apps.googleusercontent.com};

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const expenses = data.values.slice(1); // Exclude header row
        const expensesBody = document.getElementById('expensesBody');
        expensesBody.innerHTML = '';

        expenses.forEach(expense => {
            const [category, amount, date] = expense;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category}</td>
                <td>${amount}</td>
                <td>${date}</td>
            `;
            expensesBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching expenses:', error);
    });
}

// Function to set budget
function setBudget(category, budget) {
    // Implement budgeting functionality here
}

// Event listener for expense form submission
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    addExpense(category, amount);
});

// Event listener for setting budget
document.getElementById('setBudgetBtn').addEventListener('click', function() {
    const category = document.getElementById('budgetCategory').value;
    const budget = parseFloat(document.getElementById('budgetAmount').value);
    if (isNaN(budget) || budget <= 0) {
        document.getElementById('budgetAlert').textContent = 'Please enter a valid budget.';
        return;
    }
    document.getElementById('budgetAlert').textContent = '';
    setBudget(category, budget);
});

// Fetch expenses on page load
fetchExpenses();

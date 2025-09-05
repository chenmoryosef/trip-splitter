// Trip Splitter Application
class TripSplitter {
    constructor() {
        this.people = [];
        this.expenses = [];
        this.init();
    }

    init() {
        // Load data from localStorage if available
        this.loadData();
        this.updatePeopleSelect();
        this.displayPeople();
        this.displayExpenses();
        
        // Add enter key listeners
        document.getElementById('personName').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPerson();
        });
        
        document.getElementById('expenseDescription').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addExpense();
        });
        
        document.getElementById('expenseAmount').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addExpense();
        });
    }

    addPerson() {
        const nameInput = document.getElementById('personName');
        const name = nameInput.value.trim();
        
        if (!name) {
            alert('Please enter a name');
            return;
        }
        
        if (this.people.includes(name)) {
            alert('This person is already in the group');
            return;
        }
        
        this.people.push(name);
        nameInput.value = '';
        this.updatePeopleSelect();
        this.displayPeople();
        this.saveData();
        
        // Clear results when people change
        document.getElementById('results').innerHTML = '';
    }

    removePerson(name) {
        // Check if person has expenses
        const hasExpenses = this.expenses.some(expense => expense.paidBy === name);
        if (hasExpenses) {
            if (!confirm(`${name} has expenses recorded. Removing them will also remove their expenses. Continue?`)) {
                return;
            }
            // Remove expenses paid by this person
            this.expenses = this.expenses.filter(expense => expense.paidBy !== name);
            this.displayExpenses();
        }
        
        this.people = this.people.filter(person => person !== name);
        this.updatePeopleSelect();
        this.displayPeople();
        this.saveData();
        
        // Clear results when people change
        document.getElementById('results').innerHTML = '';
    }

    updatePeopleSelect() {
        const select = document.getElementById('expensePaidBy');
        select.innerHTML = '<option value="">Who paid?</option>';
        
        this.people.forEach(person => {
            const option = document.createElement('option');
            option.value = person;
            option.textContent = person;
            select.appendChild(option);
        });
    }

    displayPeople() {
        const peopleList = document.getElementById('peopleList');
        
        if (this.people.length === 0) {
            peopleList.innerHTML = '<li class="empty-state">No group members added yet</li>';
            return;
        }
        
        peopleList.innerHTML = this.people.map(person => `
            <li>
                <span>${person}</span>
                <button class="remove-btn" onclick="tripSplitter.removePerson('${person}')" title="Remove ${person}">×</button>
            </li>
        `).join('');
    }

    addExpense() {
        const description = document.getElementById('expenseDescription').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const paidBy = document.getElementById('expensePaidBy').value;
        
        if (!description) {
            alert('Please enter an expense description');
            return;
        }
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        if (!paidBy) {
            alert('Please select who paid for this expense');
            return;
        }
        
        const expense = {
            id: Date.now(),
            description,
            amount,
            paidBy,
            date: new Date().toLocaleDateString()
        };
        
        this.expenses.push(expense);
        
        // Clear form
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expensePaidBy').value = '';
        
        this.displayExpenses();
        this.saveData();
        
        // Clear results when expenses change
        document.getElementById('results').innerHTML = '';
    }

    removeExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.displayExpenses();
        this.saveData();
        
        // Clear results when expenses change
        document.getElementById('results').innerHTML = '';
    }

    displayExpenses() {
        const expensesList = document.getElementById('expensesList');
        
        if (this.expenses.length === 0) {
            expensesList.innerHTML = '<div class="empty-state">No expenses added yet</div>';
            return;
        }
        
        const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        expensesList.innerHTML = `
            <div class="total-expenses">
                Total Expenses: $${total.toFixed(2)}
            </div>
            ${this.expenses.map(expense => `
                <div class="expense-item">
                    <div class="expense-details">
                        <div class="expense-description">${expense.description}</div>
                        <div class="expense-meta">Paid by ${expense.paidBy} on ${expense.date}</div>
                    </div>
                    <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    <button class="remove-btn" onclick="tripSplitter.removeExpense(${expense.id})" title="Remove expense">×</button>
                </div>
            `).join('')}
        `;
    }

    calculateSplit() {
        if (this.people.length === 0) {
            alert('Please add some group members first');
            return;
        }
        
        if (this.expenses.length === 0) {
            alert('Please add some expenses first');
            return;
        }
        
        const totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const perPersonShare = totalExpenses / this.people.length;
        
        // Calculate how much each person paid and owes
        const balances = {};
        this.people.forEach(person => {
            balances[person] = {
                paid: 0,
                owes: perPersonShare,
                balance: 0
            };
        });
        
        // Calculate how much each person actually paid
        this.expenses.forEach(expense => {
            balances[expense.paidBy].paid += expense.amount;
        });
        
        // Calculate net balance (positive = owed money, negative = owes money)
        this.people.forEach(person => {
            balances[person].balance = balances[person].paid - balances[person].owes;
        });
        
        // Generate settlement instructions
        const settlements = this.generateSettlements(balances);
        
        // Display results
        this.displayResults(totalExpenses, perPersonShare, balances, settlements);
    }

    generateSettlements(balances) {
        const settlements = [];
        const creditors = []; // People who are owed money
        const debtors = []; // People who owe money
        
        // Separate creditors and debtors
        Object.entries(balances).forEach(([person, data]) => {
            if (data.balance > 0.01) { // More than 1 cent precision
                creditors.push({ name: person, amount: data.balance });
            } else if (data.balance < -0.01) {
                debtors.push({ name: person, amount: Math.abs(data.balance) });
            }
        });
        
        // Sort by amount (largest first)
        creditors.sort((a, b) => b.amount - a.amount);
        debtors.sort((a, b) => b.amount - a.amount);
        
        // Generate settlements
        let i = 0, j = 0;
        while (i < creditors.length && j < debtors.length) {
            const creditor = creditors[i];
            const debtor = debtors[j];
            
            const amount = Math.min(creditor.amount, debtor.amount);
            
            if (amount > 0.01) {
                settlements.push({
                    from: debtor.name,
                    to: creditor.name,
                    amount: amount
                });
            }
            
            creditor.amount -= amount;
            debtor.amount -= amount;
            
            if (creditor.amount < 0.01) i++;
            if (debtor.amount < 0.01) j++;
        }
        
        return settlements;
    }

    displayResults(total, perPerson, balances, settlements) {
        const resultsDiv = document.getElementById('results');
        
        let html = `
            <div class="total-expenses">
                <strong>Total Trip Cost: $${total.toFixed(2)}</strong><br>
                <span style="font-size: 0.9rem; font-weight: normal;">Each person should pay: $${perPerson.toFixed(2)}</span>
            </div>
        `;
        
        // Show individual balances
        html += '<h4 style="margin-bottom: 15px; color: #2d3748;">💰 Individual Summary:</h4>';
        Object.entries(balances).forEach(([person, data]) => {
            const status = data.balance > 0.01 ? 'is owed' : data.balance < -0.01 ? 'owes' : 'is even';
            const amount = Math.abs(data.balance);
            const color = data.balance > 0.01 ? '#48bb78' : data.balance < -0.01 ? '#e53e3e' : '#718096';
            
            html += `
                <div class="settlement-item" style="border-color: ${color}20;">
                    <strong>${person}</strong> paid $${data.paid.toFixed(2)} and ${status} 
                    ${amount > 0.01 ? `<span style="color: ${color}; font-weight: bold;">$${amount.toFixed(2)}</span>` : '<span style="color: #48bb78;">nothing</span>'}
                </div>
            `;
        });
        
        // Show settlements
        if (settlements.length > 0) {
            html += '<h4 style="margin: 20px 0 15px 0; color: #2d3748;">🔄 Settlement Instructions:</h4>';
            settlements.forEach(settlement => {
                html += `
                    <div class="settlement-item" style="background: #fef5e7; border-color: #ed8936;">
                        <strong>${settlement.from}</strong> should pay <strong>${settlement.to}</strong> 
                        <span style="color: #ed8936; font-weight: bold; font-size: 1.1rem;">$${settlement.amount.toFixed(2)}</span>
                    </div>
                `;
            });
        } else {
            html += `
                <div style="text-align: center; color: #48bb78; font-weight: 600; margin-top: 20px;">
                    🎉 Everyone is settled up! No money needs to be exchanged.
                </div>
            `;
        }
        
        resultsDiv.innerHTML = html;
    }

    saveData() {
        const data = {
            people: this.people,
            expenses: this.expenses
        };
        localStorage.setItem('tripSplitterData', JSON.stringify(data));
    }

    loadData() {
        const saved = localStorage.getItem('tripSplitterData');
        if (saved) {
            const data = JSON.parse(saved);
            this.people = data.people || [];
            this.expenses = data.expenses || [];
        }
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            this.people = [];
            this.expenses = [];
            this.updatePeopleSelect();
            this.displayPeople();
            this.displayExpenses();
            document.getElementById('results').innerHTML = '';
            localStorage.removeItem('tripSplitterData');
        }
    }
}

// Initialize the app
const tripSplitter = new TripSplitter();

// Global functions for button clicks
function addPerson() {
    tripSplitter.addPerson();
}

function addExpense() {
    tripSplitter.addExpense();
}

function calculateSplit() {
    tripSplitter.calculateSplit();
}

// Add clear all button functionality (we could add this to the UI later)
window.clearAll = () => tripSplitter.clearAll();

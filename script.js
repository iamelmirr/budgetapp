"user strict"

// selectors

const calculateBtn = document.getElementById('btn_budget')
const addExpensesBtn = document.getElementById('btn_expenses')

const errorMesgEl = document.querySelector('.error_message')
const budgetInputEl = document.querySelector('.budget_input')
const expenseDesEl = document.querySelector('.expenses_input')
const expenseAmountEl = document.querySelector('.expenses_amount')
const tblRecordEl = document.querySelector('.tbl_data')
const cardsContainer = document.querySelector('.cards')


const budgetCardEl = document.querySelector('.budget_card')
const expensesCardEl = document.querySelector('.expenses_card')
const balanceCardEl = document.querySelector('.balance_card')
const deleteBtn = document.querySelector('.btn_delete')
const editBtn = document.querySelector('.btn_edit')


// defining values || if local storage used


let itemList = JSON.parse(localStorage.getItem('itemList')) || []
let itemId = 0
let expenses = parseFloat(localStorage.getItem('expenses')) || 0
let balance = parseFloat(localStorage.getItem('balance')) || 0
let budget = parseFloat(localStorage.getItem('budget')) || 0


// Calculate button


calculateBtn.addEventListener('click', addBudget)


// defining a function that will add the budget and display it from budget input


function addBudget(e) {
    e.preventDefault()
    if (budgetInputEl.value <= 0) {

        // if budget input value was invalid, display an error message

        errorMesgEl.style.display = 'block'
        setTimeout(() => {
            errorMesgEl.style.display = 'none'
        }, 2500)
    } else {

        // update balance and budget 

        budget = parseInt(budgetInputEl.value)
        budgetCardEl.innerHTML = budget

        balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

        itemList = []

        saveToLocalStorage()


    }

    budgetInputEl.value = ''
}



// Add Expense button


addExpensesBtn.addEventListener('click', addExpenses)


// defining a function that will be triggered when Add Expense button is clicked. It will take the expense amount input and expense description input and create a new expense (item) with given values


function addExpenses(e) {
    e.preventDefault()

    if (expenseDesEl.value.trim() === '' || expenseAmountEl.value <= 0) {

        // if input is not valid, display an error message

        errorMesgEl.style.display = 'block'
        setTimeout(() => {
            errorMesgEl.style.display = 'none'
        }, 2500)
    } else {

        // define an expense ID

        expenseId = itemList.length + 1

        // define an object expense

        let expense = {
            id: expenseId,
            desc: expenseDesEl.value,
            price: parseFloat(expenseAmountEl.value)
        }

        // push the expense to the item list and add it to the table

        itemList.push(expense)
        addExpenseToTable(expense)

        saveToLocalStorage()
    }

    expenseDesEl.value = ''
    expenseAmountEl.value = ''
}


// define a function that will take a parameter expense and display it inside the table


function addExpenseToTable(expense) {

    const tblRow = document.createElement('ul')
    tblRow.classList.add('tbl_tr_content')

    tblRow.innerHTML = `<li>${expense.id}</li>
                     <li>${expense.desc}</li>
                     <li><span>$</span>${expense.price}</li>
                     <li>
                         <button type="button" class="btn_edit">Edit</button>
                         <button type="button" class="btn_delete">Delete</button>
                     </li>`

    tblRecordEl.appendChild(tblRow)


    // update expense, balance and budget cards


    expenses = expenses + expense.price
    expensesCardEl.innerHTML = expenses

    balance = parseInt(budget - expenses)
    balanceCardEl.innerHTML = balance


    // make edit and delete buttons interactive 


    const editBtn = tblRow.querySelector('.btn_edit')
    const deleteBtn = tblRow.querySelector('.btn_delete')

    editBtn.addEventListener('click', () => {
        expenseDesEl.value = expense.desc
        expenseAmountEl.value = expense.price

        expenses = expenses - expense.price
        expensesCardEl.innerHTML = expenses

        balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

        itemList = itemList.filter(item => item.id !== expense.id)

        tblRecordEl.removeChild(tblRow)

        saveToLocalStorage()

    })

    deleteBtn.addEventListener('click', () => {

        expenses = expenses - expense.price
        expensesCardEl.innerHTML = expenses

        balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

        itemList = itemList.filter(item => item.id !== expense.id)

        tblRecordEl.removeChild(tblRow)

        saveToLocalStorage()

    })

}



// save to local storage

function saveToLocalStorage() {
    localStorage.setItem('budget', budget)
    localStorage.setItem('expenses', expenses)
    localStorage.setItem('balance', balance)
    localStorage.setItem('itemList', JSON.stringify(itemList))
}


// load from local storage when refreshed

document.addEventListener('DOMContentLoaded', loadStoredData)

function loadStoredData() {
    budgetCardEl.innerHTML = budget
    expensesCardEl.innerHTML = expenses
    balanceCardEl.innerHTML = balance

    let totalExpenses = 0

    itemList.forEach(expense => {
        addExpenseToTable(expense)
        totalExpenses = totalExpenses + expense.price
    })

    expenses = totalExpenses
    expensesCardEl.innerHTML = expenses
    balance = budget - expenses
    balanceCardEl.innerHTML = balance
}



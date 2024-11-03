'user strict'

// const errorMesgEl = document.querySelector('.error_message')
// const budgetInputEl = document.querySelector('.budget_input')
// const expenseDesEl = document.querySelector('.expenses_input')
// const expenseAmountEl = document.querySelector('.expenses_amount')
// const tblRecordEl = document.querySelector('.tbl_data')
// const cardsContainer = document.querySelector('.cards')


// const budgetCardEl = document.querySelector('.budget_card')
// const expensesCardEl = document.querySelector('.expenses_card')
// const balanceCardEl = document.querySelector('.balance_card')
// const deleteBtn = document.querySelector('.btn_delete')
// const editBtn = document.querySelector('.btn_edit')

// let itemList = []
// let itemId = 0
// let balance = 0
// let expenses = 0

// expensesCardEl.innerHTML = expenses


// const calculateBtn = document.getElementById('btn_budget')
// const addExpensesBtn = document.getElementById('btn_expenses')


// addExpensesBtn.addEventListener('click', addExpense)



// // function errorMessage () {
// //     errorMesgEl.style.display = 'block'
// // }

// function addBudget (e) {
//     e.preventDefault()
//     if (budgetInputEl.value.trim() === '') {

//         errorMesgEl.style.display = 'block'
//         setTimeout(() => {
//             errorMesgEl.style.display = 'none'
//         }, 2000)
//     } else {

//         balance = parseFloat(budgetInputEl.value)
//         budgetCardEl.innerHTML = balance

//         updateBalanceDisplay()
//     }

//     budgetInputEl.value = ''
// }

// calculateBtn.addEventListener('click', addBudget)

// function addExpense (e) {



//     e.preventDefault()
//     if (typeof expenseDesEl.value.trim() !== 'string' || expenseDesEl.value.trim() === '' || expenseAmountEl.value <= 0) {
//         errorMesgEl.style.display = 'block'
//         setTimeout(() => {
//             errorMesgEl.style.display = 'none'
//         }, 2000)
//     } else {
//         let expenseId = itemList.length + 1
//     let expense = {
//         id: expenseId,
//         desc: expenseDesEl.value,
//         price: parseFloat(expenseAmountEl.value)
//     }
//     itemList.push(expense)

//     addExpenseToTable(expense)

//     expenseAmountEl.value = ''
//     expenseDesEl.value = ''



//     }
// }




// function addExpenseToTable (expense) {




//     const tblRow = document.createElement('ul')
//     tblRow.classList.add('tbl_tr_content')

//     tblRow.innerHTML = `<li>${expense.id}</li>
//                     <li>${expense.desc}</li>
//                     <li><span>$</span>${expense.price}</li>
//                     <li>
//                         <button type="button" class="btn_edit">Edit</button>
//                         <button type="button" class="btn_delete">Delete</button>
//                     </li>`

//     tblRecordEl.appendChild(tblRow)



//     const editBtn = tblRow.querySelector('.btn_edit')
//     const deleteBtn = tblRow.querySelector('.btn_delete')

//     expenses = expenses + expense.price

//     expensesCardEl.innerHTML = expenses

//     updateBalanceDisplay()

//     editBtn.addEventListener('click', () => {
//         expenseDesEl.value = expense.desc
//         expenseAmountEl.value = expense.price

//         tblRecordEl.removeChild(tblRow)

//         expenses = expenses - expense.price

//     expensesCardEl.innerHTML = expenses
//     updateBalanceDisplay()
//     })

//     deleteBtn.addEventListener('click', () => {
//         tblRecordEl.removeChild(tblRow)

//         expenses = expenses - expense.price

//     expensesCardEl.innerHTML = expenses

//     updateBalanceDisplay()

//         itemList = itemList.filter(item => item.id !== expense.id)

//     })
// }


// function updateBalanceDisplay() {
//     const currentBalance = balance - expenses
//     balanceCardEl.innerHTML = currentBalance
// }




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

const calculateBtn = document.getElementById('btn_budget')
const addExpensesBtn = document.getElementById('btn_expenses')

let itemList = []
let itemId = 0
let expenses = 0
let balance = 0
let budget = 0

calculateBtn.addEventListener('click', addBudget)

function addBudget(e) {
    e.preventDefault()
    if (budgetInputEl.value <= 0) {
        errorMesgEl.style.display = 'block'
        setTimeout(() => {
            errorMesgEl.style.display = 'none'
        }, 2500)
    } else {
        budget = parseInt(budgetInputEl.value)
        budgetCardEl.innerHTML = budget

        balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

        itemList = []

    }

    budgetInputEl.value = ''
}


addExpensesBtn.addEventListener('click', addExpenses)

function addExpenses(e) {
    e.preventDefault()

    if (expenseDesEl.value.trim() === '' || expenseAmountEl.value <= 0) {
        errorMesgEl.style.display = 'block'
        setTimeout(() => {
            errorMesgEl.style.display = 'none'
        }, 2500)
    } else {
        expenseId = itemList.length + 1

        let expense = {
            id: expenseId,
            desc: expenseDesEl.value,
            price: parseFloat(expenseAmountEl.value)
        }

        itemList.push(expense)
        addExpenseToTable(expense)
    }

    expenseDesEl.value = ''
    expenseAmountEl.value = ''
}

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

    expenses = expenses + expense.price
    expensesCardEl.innerHTML = expenses

    balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

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


    })

    deleteBtn.addEventListener('click', () => {

        expenses = expenses - expense.price
        expensesCardEl.innerHTML = expenses

        balance = parseInt(budget - expenses)
        balanceCardEl.innerHTML = balance

        itemList = itemList.filter(item => item.id !== expense.id)

        tblRecordEl.removeChild(tblRow)
    })

}

document.addEventListener("DOMContentLoaded", () =>
{
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");
    const addBtn = document.getElementById("add-btn");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) =>
    {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount>0)
        {
            const newExpense =
            {
                id : Date.now(),
                name : name,
                amount : amount
            }
            expenses.push(newExpense);
            saveExpensesTolocal();
            renderExpenses();
            updateTotal();

            console.log(localStorage.getItem("expenses"));
            
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
      
    });


    function calculateTotal()
    {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function renderExpenses()
    {
        expenseList.innerHTML = "";
        expenses.forEach((expense) =>
        {
            const li = document.createElement("li");
            li.className = "border flex px-2 py-1 mb-2 justify-between"
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button class="bg-red-400 px-2 hover:bg-red-500 rounded" data-id="${expense.id}">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    function updateTotal()
    {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    

    function saveExpensesTolocal()
    {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    expenseList.addEventListener("click", (e) =>
    {
        if(e.target.tagName === "BUTTON")
        {
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpensesTolocal();
            renderExpenses();
            updateTotal();
        }
    });


});
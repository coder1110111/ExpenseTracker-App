


async function AddExpense(event) {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const userEmail = "test@gmail.com";
    const response = await fetch('http://localhost:1800/tracker/post-Expense', {
        method:"POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ amount, description, category, userEmail})
    });
    if(response.ok) {
        //add expense in list
        alert("Node Created!");
        location.reload();
    } else {
        alert("Error submitting Expense");
    }
}

async function fetchExpense(event) {
    //event.preventDefault();
    const userEmail = "test@gmail.com";
    try {
        const response = await fetch('http://localhost:1800/tracker/get-Expense', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ userEmail })
        });
        if(response.ok) {
            const expenses = await response.json();
    
            const expenseList = document.getElementById('output_list');
            expenseList.innerHTML = "";
            expenses.forEach(expense => {
                const newDiv = document.createElement('div');
                newDiv.innerHTML=`
                    <p> ${expense.amount}--${expense.category}--${expense.description}--<button type="button" id="delete-btn>Delete</button>
                `;
                expenseList.appendChild(newDiv);
            });
        } else {
            console.log('No transactions logged');
        }
    } catch(err) {
        console.log(err);
    }

}

window.onload = (event) => {
    event.preventDefault();
    fetchExpense();
}

window.onload = function() {
    fetchTransactions();
}

async function AddExpense(event) {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const userEmail = "test@gmail.com";
    const response = await fetch('http://localhost:1800/tracker/main', {
        method:"POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ amount, description, category, userEmail})
    });
    if(response.ok) {
        //add expense in list
        alert("Node Created!");
    } else {
        alert("Error submitting Expense");
    }
}
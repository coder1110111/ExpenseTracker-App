
window.onload = (event) => {
    event.preventDefault();
            const date = document.querySelector('#date');
            //const year = document.querySelector('#year');
            //const month = document.querySelector('#month');
            const currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            console.log(currentDate);
            date.innerHTML=`${day}-${month}-${year}`;
    getData();
}

async function getData() {
    try {
        const Response = await fetch('http://localhost:1800/premium/Document', {
            method: "GET",
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token'),
            }
        });

        if(Response.ok) {
            const Data = await Response.json();
            const expenses = Data.expenses;
            //console.log(expenses);
            expenses.forEach(expense => {
                displayData(expense);
            })
            //showTotal();
        }
    } catch(err) {
        alert(err);
    }
}
function displayData(expense) {
    const table = document.getElementById('monthlyData');
    const newtr = document.createElement('tr');
    newtr.innerHTML = `<td>${expense.createdAt.split("T")[0]}</td><td>${expense.description}</td><td>${expense.category}</td><td>${expense.amount}</td>`;
    newtr.id = expense.id;

    table.appendChild(newtr);
}

function showTotal() {

}
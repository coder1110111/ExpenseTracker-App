const backendAPI = "http://localhost:1800";


async function AddExpense(event) {
    event.preventDefault();
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const userEmail = "test@gmail.com";
    const response = await fetch(`${backendAPI}/tracker/post-Expense`, {
        method:"POST",
        headers: {
            'Content-Type' : 'application/json',
            Authorization : localStorage.getItem('token')
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

async function deleteTransaction(id) {
    //console.log(id);
    const response = await fetch(`${backendAPI}/tracker/delete-Transaction/${id}`, {
        method:'DELETE',
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    });
    if(response.ok) {
        alert("Transaction Deleted!");
        //deleteFromUI(id);
        location.reload();
    } 
    else console.log('Error somewhere');
}

/* function deleteFromUI(id) {      //used when dont want to reload the page itself
    const expenseTable = document.querySelector('#expenseTable');
    const deleteRow = document.getElementById(id);
    expenseTable.removeChild(deleteRow);
} */

/* async function fetchExpense() {          //Not used now for pagination
    try {
        const response = await fetch(`${backendAPI}/tracker/get-Expense`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        });
        if(response.ok) {
            const expenses = await response.json();
    
            const expenseList = document.getElementById('output_list');
            expenseList.innerHTML = "";
            expenses.forEach(expense => {
                displayToUI(expense);
            });
        } else {
            console.log('No transactions logged');
        }
    } catch(err) {
        console.log(err);
    }
} */

async function fetchExpenses(page) {        //fetchExpense based on Pages
    
    try{
        const Response = await fetch(`${backendAPI}/tracker/get-Expense?page=${page}`, {
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : localStorage.getItem('token'),
                'ItemsPerPage' : localStorage.getItem('ItemperPage')
            }
        });
        if(Response.ok) {
            const Data = await Response.json();
            //console.log(Data);
            const { expenses , ...pageData}  = Data;
            console.log(expenses);
            console.log(pageData);
            tableINIT();
            displayToTable(expenses);
            //displayToUI(expenses);
            
            paginator(pageData);                
        }

    } catch(error) {
        console.log("Error in Fetching Expense >>>>" , error);
    }
}

function tableINIT() {
    const expenseTable = document.querySelector('#expenseTable');
    expenseTable.innerHTML="";
    var titleRow = expenseTable.insertRow(0);
    
    var amount = titleRow.insertCell(0);
    amount.innerHTML = "<b>AMOUNT</b>";
    amount.style.width='20%';

    var category = titleRow.insertCell(1);
    category.innerHTML = "<b>Category</b>";
    category.style.width='20%';

    var description = titleRow.insertCell(2);
    description.innerHTML = "<b>Description</b>";
    description.style.width='45%';

    var misc = titleRow.insertCell(3);
    misc.innerHTML = "";


    titleRow.style.backgroundColor = "Seagreen";
    titleRow.style.color = "White";
}

function displayToTable(expenses) {
    const expenseTable = document.querySelector('#expenseTable');
    let i = 1;
    expenses.forEach(expense => {
        
        const dataRow = expenseTable.insertRow(i);
        if(i%2 === 0) {
            dataRow.style.backgroundColor = 'LightGray';
        }
        i++;

        dataRow.setAttribute('id',expense.id);
        
        const amountCell = dataRow.insertCell(0);
        amountCell.innerHTML = `${expense.amount}`;

        const categoryCell = dataRow.insertCell(1);
        categoryCell.innerHTML = `${expense.category}`;

        const descriptionCell = dataRow.insertCell(2);
        descriptionCell.innerHTML = `${expense.description}`;

        const miscCell = dataRow.insertCell(3);

            const deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('type' , 'button');
            deleteBtn.addEventListener('click', () => deleteTransaction(dataRow.id));
            const dlttxt = document.createTextNode('DELETE');
            deleteBtn.appendChild(dlttxt);

            miscCell.appendChild(deleteBtn);

    })

}

function displayToUI(expenses) {        //gets data from fetchExpense to display expense //needs table for better display
    const expenseList = document.getElementById('output_list');
    expenseList.innerHTML = "";
    
    expenses.forEach(expense => {
        const newDiv = document.createElement('div');
    newDiv.setAttribute('id',expense.id);
                
    const newp = document.createElement('p');
    newp.innerHTML = `${expense.amount} -- ${expense.category} -- ${expense.description} --`;
                

    const deletebtn = document.createElement('button');
    deletebtn.setAttribute('type', 'button');
    const deleteTxt = document.createTextNode('Delete');
    deletebtn.appendChild(deleteTxt);
    deletebtn.addEventListener('click', () => deleteTransaction(newDiv.id));

    newp.appendChild(deletebtn);

    newDiv.appendChild(newp);
    expenseList.appendChild(newDiv);
    })
}

function paginator(pageData) {          //Handle how to manage pageData     THIS IS WHERE YOU ARE CURRENTLY
    const pages = document.querySelector('#pagination');
    pages.innerHTML="";
    if(pageData.hasPreviousPage) {
        const prevPage = document.createElement('input');
        prevPage.setAttribute('type','button');
        prevPage.value = pageData.previousPage;
        prevPage.style.marginLeft='3%';
        prevPage.addEventListener('click', () => fetchExpenses(prevPage.value));
        pages.appendChild(prevPage);
    }
    const currPage = document.createElement('input');
    currPage.setAttribute('type','button');
    currPage.value = parseInt(pageData.currentPage);
    currPage.style.backgroundColor="Aquamarine";
    currPage.style.marginLeft='3%';
    pages.appendChild(currPage);
    if(pageData.hasNextPage) {
        const nextPage = document.createElement('input');
        nextPage.setAttribute('type', 'button');
        nextPage.value = pageData.nextPage;
        nextPage.style.marginLeft='3%';
        nextPage.addEventListener('click', () => fetchExpenses(nextPage.value));
        pages.appendChild(nextPage);
    }
}

async function getLeaderboard(event) {          //This happens only if account is of Premium Category
    event.preventDefault();
    try{
        const leaderDisplay = document.querySelector('#leaderboard');
        const response = await fetch(`${backendAPI}/premium/get-Leaderboard`, {
            method:"GET",
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        //console.log(response);
        if(response.ok) {
            leaderDisplay.innerHTML = "";
            const leaderboardData = await response.json();
            let i=1;
            leaderboardData.forEach(data => {
                displayLeaderBoard(data,i);
                i++;
            });
            //Add a hide/delete leaderboard button BUT MAKE IT SO THAT THE GET LEADERBOARD BUTTON CHANGES TO CLOSE LEADERBOARD
            document.querySelector('#ldr-btn-on').hidden=true;
            document.querySelector('#ldr-btn-off').hidden=false;



        } else {
            console.log("LeaderBoard Not initiated");
        }

    } catch(error) {
        console.log(error);
    }
    


}

function closeLeaderboard() {
    const leaderboardDisp = document.querySelector('#leaderboard');
    leaderboardDisp.innerHTML="";
    document.querySelector('#ldr-btn-on').hidden = false;
    document.querySelector('#ldr-btn-off').hidden = true;
}

function displayLeaderBoard(node,rank) {
    //console.log(node.name);       //debug
    const leaderboard = document.querySelector('#leaderboard');
    if(node.totalExpense === null){
        node.totalExpense = 0;
    }

    const newP = document.createElement('p');
    newP.innerHTML = `${rank} -- ${node.name} -- ${node.total_expense}`;

    leaderboard.appendChild(newP);

}

function changeItemperPage(event) {
    event.preventDefault();
    const itemsper = document.querySelector('#dynamicPages').value;
    localStorage.setItem("ItemperPage", itemsper);
    //console.log("ItemsPerPage changed to >>>", itemsper);
    location.reload();
}


window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    
    const page=1;
    let Itemper = localStorage.getItem('ItemperPage');
    if(Itemper === null) {
        Itemper = "5";
        localStorage.setItem('ItemperPage',Itemper);
    }
    //console.log(Itemper);
    const select = document.querySelector('#dynamicPages');
    let option;
    for(var i=0; i<select.options.length; i++) {
        option = select.options[i];
        
        if(option.value === Itemper) {
            //console.log(option);
            option.setAttribute('selected', true);
            break;
        }
    }
    
    fetchExpenses(page);

});

function logOut() {
    //delete token id from localStorage
    //redirect to login page
    console.log('Hello form logout');
}


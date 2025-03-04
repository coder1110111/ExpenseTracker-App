
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
            document.querySelector('#downloadBtn').addEventListener('click', generatePDF);
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

function generatePDF() {
    const ele = document.querySelector('.sheet');
    const options = {
        margin: [10, 10, 10, 10],
        filename: 'Monthly_Expenses.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy']}
    };
    html2pdf().set(options).from(ele).save();
}

    /* function PdfDownload() {
        const table = document.querySelector("#monthlyData");

        const tableData = [];
        const rows = table.rows;
        for(let i = 0; i < rows.length; i++) {
            const rowData = [];
            const cells = rows[i].cells;
            for(let j = 0; j<cells.length; j++) {
                rowData.push(cells[j].innerText);
            }
            tableData.push(rowData);
        }

        const docDefinition = {
            content: [
                {
                    text: 'This is your Expenses',
                    style: 'header'
                },
                {
                    table: {
                        widths: ['50%', '*', '*'],
                        body: tableData
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                }
            }
        };

        pdfMake.createPdf(docDefinition).download('expense.pdf');
    } */
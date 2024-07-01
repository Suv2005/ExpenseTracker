let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('categoryselect');
const amountInput = document.getElementById('amountinput');
const dateInput = document.getElementById('dateinput');
const addBtn = document.getElementById('addbtn');
const expensesTableBody = document.getElementById('expnesetablebody');
const searchitem = document.getElementById('searchitem');
const des = document.getElementById('description');
const cat = document.getElementById('category1');
const totalAmountCell = document.getElementById('totalamount');
const dat = document.getElementById('dat');
const amt = document.getElementById('amt');
const catu = document.getElementById('catu');
const chartDiv = document.getElementById('chart_div');
const search=document.getElementById('search');
const searchbtn= document.getAnimations('searchbtn');


function drawChart() {

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Amount');

  
    let categoryMap = new Map();
    expenses.forEach(expense => {
        if (categoryMap.has(expense.category)) {
            categoryMap.set(expense.category, categoryMap.get(expense.category) + expense.amount);
        } else {
            categoryMap.set(expense.category, expense.amount);
        }
    });

    let chartData = [];
    categoryMap.forEach((amount, category) => {
        chartData.push([category, amount]);
    });

    data.addRows(chartData);


    let options = {
        title: 'Expenses by Category',
        width: 600,
        height: 400,
        legend: { position: 'top' }
    };

    let chart = new google.visualization.PieChart(chartDiv);
    chart.draw(data, options);
}

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const desc = des.value;
    const cate = cat.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    if (category === 'Salary') {
        totalAmount += amount;
    } else {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = totalAmount;
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const cateCell = newRow.insertCell();
    const desCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = category;
    amountCell.textContent = amount;
    dateCell.textContent = date;
    cateCell.textContent = cate;
    desCell.textContent = desc;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deletebtn');
    deleteBtn.addEventListener('click', function() {
        const index = expenses.findIndex(expense => 
            expense.category === category &&
            expense.amount === amount &&
            expense.date === date &&
            expense.cate === cate &&
            expense.desc === desc
        );

        if (index !== -1) {
            if (expenses[index].category === 'Salary') {
                totalAmount -= expenses[index].amount;
            } else {
                totalAmount += expenses[index].amount;
            }
            totalAmountCell.textContent = totalAmount;

            expenses.splice(index, 1);
            expensesTableBody.removeChild(newRow);
        }
    });

    deleteCell.appendChild(deleteBtn);

    expenses.push({ category, amount, date, cate, desc });

    dat.innerHTML = `<h5>Date: ${date}</h5>`;
    amt.innerHTML = `<h5>Amount: ${amount}</h5>`;
    catu.innerHTML = `<h5>Category: ${category}</h5>`;

    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
    des.value = '';
    cat.value = '';

    drawChart();
});


google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


function search1() {
    const val = search.value.trim().toLowerCase(); 

    while (searchitem.rows.length > 0) {
        searchitem.deleteRow(0);
    }

    expenses.forEach(expense => {
        if (expense.category.toLowerCase() === val) {
            const newRow = searchitem.insertRow();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const cateCell = newRow.insertCell();
            const desCell = newRow.insertCell();

            amountCell.textContent = expense.amount;
            dateCell.textContent = expense.date;
            cateCell.textContent = expense.cate;
            desCell.textContent = expense.desc;
        }
    });
}


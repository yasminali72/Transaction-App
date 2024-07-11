'use strict'

const customer = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" },
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 },
  ],
};

let chart;

$(document).ready(function(){
  
    displayTable()
  
})
function displayTable(){
  customer["customers"].forEach((element) => {
    displayData(element);
    
  });
}


function displayData(element) {

  const transactions = [];
  for (let i = 0; i < customer["transactions"].length; i++) {
    if (customer["transactions"][i].customer_id === element.id) {
      transactions.push(customer["transactions"][i]);
    }
  }
  transactions.forEach((transaction) => {
    $("#tbody").append(`
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount}</td>
            </tr>
        `);
  });
  

}

$("#input").on("input", function () {
  
  const value = $(this).val();
  console.log(value);
  let names = [];
  let amounts = [];
  for (let index = 0; index < customer["customers"].length; index++) {
   
    if (
      
      customer.customers[index].name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase() )
      
    ) {
      names.push(customer["customers"][index]);
      console.log(names);
    }
  }

  for (let index = 0; index < customer["transactions"].length; index++) {
    if (parseFloat(value) === customer.transactions[index].amount) {
      amounts.push(customer.transactions[index]);
    }
  }
  
 if(names.length>0 &&value.length>0){
    $("#tbody").empty();
    let id;
      names.forEach(element => {
        displayData(element);
        id=element.id
      })
     removeChart()  
   updateChart(id)
 }

 

 else if(amounts.length > 0){
    amount(amounts);
   
  }
 
   
  
else if(value.length===0){
 
    $("#tbody").empty();
   removeChart()
    displayTable()

   
}
else{
  $("#tbody").empty();
 removeChart()
}
});

function amount(amounts) {
  $("#tbody").empty();
  amounts.forEach((transaction) => {
    displayDataByAmount(transaction);
  });
}


function displayDataByAmount(transaction) {
  const customers = [];

  for (let index = 0; index < customer.customers.length; index++) {
    if (transaction.customer_id === customer.customers[index].id) {
      customers.push(customer.customers[index]);
    }
  }

  customers.forEach((element) => {
    $("#tbody").append(`<tr>
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td>${transaction.date}</td>
        <td>${transaction.amount}</td>
    </tr>`);
  });
}


function updateChart(id){
  
  const transactions = [];
  for (let i = 0; i < customer["transactions"].length; i++) {
    if (customer["transactions"][i].customer_id === id) {
      transactions.push(customer["transactions"][i]);
    }
  }
 
  let amount=[]
  let date=[]
  const barColors = ["orange", "green"]
  transactions.forEach(transaction=>{
amount.push(transaction.amount)
date.push(transaction.date)
  })

 

console.log(amount,date);


chart= new Chart("myChart", {
  type: "bar",
  data: {
    labels:date,
    datasets: [{
      backgroundColor: barColors,
      data: amount
      
    }]
   },
  
  options: {scales: {
    y: {
      beginAtZero: false
    }
  }
}
});
}

function removeChart(){
  if (chart) {
    chart.destroy(); // Destroy the previous chart if it exists
  }
}


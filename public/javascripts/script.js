document.addEventListener("DOMContentLoaded", main);
function main(evt) {
   var filterBtn = document.querySelector('#filterBtn');
   filterBtn.addEventListener('click', handleFilterButtonClick);

   var addBtn = document.querySelector('#addBtn');
   addBtn.addEventListener('click', handleSend);
}

function handleFilterButtonClick(evt) {
    evt.preventDefault();
    console.log("button clicked");
    // get the value of the input field
    var items_purchased = document.querySelector('#items_purchased').value;
    console.log(items_purchased);
    // create the object
    var req = new XMLHttpRequest();

    // configure
    var url = "http://localhost:3000/api/enterexpenses?items_purchased=" + items_purchased;
    req.open("GET", url);

    req.addEventListener('load', function(evt) {
        console.log('loaded repos');
        var data = JSON.parse(req.responseText);
        console.log(data);

        //get table
        var expenseTable = document.getElementById('expense-list');

        //delete contents of the table
        while(expenseTable.firstChild){
      		expenseTable.removeChild(expenseTable.firstChild);
      	}

        var rowcounter = 0;
        while(rowcounter < data.length){
          var newrow = document.createElement('tr');
          var new_item_purchased = document.createElement('td');
          var new_price_paid = document.createElement('td');
          var new_date_bought = document.createElement('td');
          var new_reason_for_purchase = document.createElement('td');
          var new_location_of_purchase= document.createElement('td');
          var new_payment_method= document.createElement('td');
          var new_reimbursement_needed = document.createElement('td');

          new_item_purchased.textContent = data[rowcounter].items_purchased;
          new_price_paid.textContent = data[rowcounter].price_paid;
          new_date_bought.textContent = data[rowcounter].date_bought;
          new_reason_for_purchase.textContent = data[rowcounter].reason_for_purchase;
          new_location_of_purchase.textContent = data[rowcounter].location_of_purchase;
          new_payment_method.textContent = data[rowcounter].payment_method;
          new_reimbursement_needed.textContent = data[rowcounter].reimbursement_needed;



      		newrow.appendChild(new_item_purchased);
      		newrow.appendChild(new_price_paid);
      		newrow.appendChild(new_date_bought);
          newrow.appendChild(new_reason_for_purchase);
      		newrow.appendChild(new_location_of_purchase);
      		newrow.appendChild(new_payment_method);
          newrow.appendChild(new_reimbursement_needed);


      		expenseTable.appendChild(newrow);

          rowcounter+=1;
        }
        console.log("table is created");
    });

    // send
    req.send();
}




//delete all elements from table

//create a new table w the filtered element data


function handleSend(evt) {
    evt.preventDefault();

    var req = new XMLHttpRequest();
    req.open('POST', '/api/enterexpenses');
    req.addEventListener('load', function() {
        console.log(req.responseText);
    });

    req.addEventListener('error', function() {
        console.log(req.responseText);
    });

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    // url encoded.... name value pairs
    // name=value
    var data = 'items_purchased_input_id=' + document.querySelector("#items_purchased_input_id").value + "&price_of_purchase_input_id=" + document.querySelector("#price_of_purchase_input_id").value + "&date_of_purchase_input_id="+document.querySelector("#date_of_purchase_input_id").value + "&reason_for_purchase_input_id="+document.querySelector("#reason_for_purchase_input_id").value + "&location_of_purchase_input_id="+document.querySelector("#location_of_purchase_input_id").value;

    data +="&payment_method_input_id="+document.querySelector("#reimbursement_needed_input_id").value +"&reimbursement_needed_input_id="+document.querySelector("#reimbursement_needed_input_id").value;



    var expenseTable = document.getElementById('expense-list');

    var newrow = document.createElement('tr');
    var new_item_purchased = document.createElement('td');
    var new_price_paid = document.createElement('td');
    var new_date_bought = document.createElement('td');
    var new_reason_for_purchase = document.createElement('td');
    var new_location_of_purchase= document.createElement('td');
    var new_payment_method= document.createElement('td');
    var new_reimbursement_needed = document.createElement('td');

    new_item_purchased.textContent = document.querySelector("#items_purchased_input_id").value;
    new_price_paid.textContent = document.querySelector("#price_of_purchase_input_id").value;
    new_date_bought.textContent = document.querySelector("#date_of_purchase_input_id").value;
    new_reason_for_purchase.textContent = document.querySelector('#reason_for_purchase_input_id').value;
    new_location_of_purchase.textContent = document.querySelector('#location_of_purchase_input_id').value;
    new_payment_method.textContent = document.querySelector('#payment_method_input_id').value;
    new_reimbursement_needed.textContent = document.querySelector('#reimbursement_needed_input_id').value;

    console.log("!!!!"+document.querySelector("#items_purchased_input_id").value);
    newrow.appendChild(new_item_purchased);
    newrow.appendChild(new_price_paid);
    newrow.appendChild(new_date_bought);
    newrow.appendChild(new_reason_for_purchase);
    newrow.appendChild(new_location_of_purchase);
    newrow.appendChild(new_payment_method);
    newrow.appendChild(new_reimbursement_needed);

    console.log("!!!!"+document.querySelector("#items_purchased_input_id").value);
    expenseTable.appendChild(newrow);

    console.log("table is created");

    console.log(data);
    req.send(data);
}

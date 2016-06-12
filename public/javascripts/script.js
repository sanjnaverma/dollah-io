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
    var director = document.querySelector('#director').value;
    console.log(director);
    // create the object
    var req = new XMLHttpRequest();

    // configure
    var url = "http://localhost:3000/api/movies?director=" + director;
    req.open("GET", url);

    req.addEventListener('load', function(evt) {
        console.log('loaded repos');
        var data = JSON.parse(req.responseText);
        console.log(data);

        //get table
        var movieTable = document.getElementById('movie-list');

        //delete contents of the table
        while(movieTable.firstChild){
      		movieTable.removeChild(movieTable.firstChild);
      	}

        var rowcounter = 0;
        while(rowcounter < data.length){
          var newrow = document.createElement('tr');
          var filteredtitle = document.createElement('td');
          var filtereddirector = document.createElement('td');
          var filteredyear = document.createElement('td');

          filteredtitle.textContent = data[rowcounter].title;
      		filtereddirector.textContent = data[rowcounter].director;
      		filteredyear.textContent = data[rowcounter].year;

      		newrow.appendChild(filteredtitle);
      		newrow.appendChild(filtereddirector);
      		newrow.appendChild(filteredyear);

      		movieTable.appendChild(newrow);

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
    req.open('POST', '/api/movies');
    req.addEventListener('load', function() {
        console.log(req.responseText);
    });

    req.addEventListener('error', function() {
        console.log(req.responseText);
    });

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    // url encoded.... name value pairs
    // name=value
    var data = 'movieTitle=' + document.querySelector("#movieTitle").value + "&movieDirector=" + document.querySelector("#movieDirector").value + "&movieYear="+document.querySelector("#movieYear").value ;
    var movieTable = document.getElementById('movie-list');

    var newrow = document.createElement('tr');
    var newtitle = document.createElement('td');
    var newdirector = document.createElement('td');
    var newyear = document.createElement('td');

    newtitle.textContent = document.querySelector("#movieTitle").value;
    newdirector.textContent = document.querySelector("#movieDirector").value;
    newyear.textContent = document.querySelector("#movieYear").value;

    newrow.appendChild(newtitle);
    newrow.appendChild(newdirector);
    newrow.appendChild(newyear);

    movieTable.appendChild(newrow);

    console.log("table is created");

    console.log(data);
    req.send(data);
}

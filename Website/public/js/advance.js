const xhr = new XMLHttpRequest();

// Acquire required HTML tags
const myForm = document.querySelector('.myform1');
let movieD = document.querySelector('#form-control1');
let seriesD = document.querySelector('#form-control2');
let actorD = document.querySelector('#form-control3');
let directorD = document.querySelector('#form-control4');
let writerD =  document.querySelector('#form-control5');

// Form listener
myForm.addEventListener('submit', printdata);

// myForm function call
function printdata(e){
    e.preventDefault();

    // SQL query holder
    let sql = '';

    // For specific blank, assign specific query
    if (movieD.value != '') {
        sql += `SELECT * FROM movie WHERE primaryTitle = '${movieD.value}'`;
    }
    else if (seriesD.value != '') {
        sql += `SELECT * FROM series WHERE primaryTitle = '${seriesD.value}'`;
    }
    else if (actorD.value != '') {
        sql += `SELECT DISTINCT a.primaryName as ActorName, m.primaryTitle as MovieName
        FROM actor a, movie m, movie_actor_relation ma
        WHERE a.actorID = ma.actorID
        AND m.movieID = ma.movieID
        AND a.primaryName = '${actorD.value}' 
        LIMIT 10`;
    } 
    else if (directorD.value != '') {
        sql += `SELECT DISTINCT d.primaryName as DirectorName, m.primaryTitle as MovieName
        FROM director d, movie m, movie_director_relation md
        WHERE d.directorID = md.directorID
        AND m.movieID = md.movieID
        AND d.primaryName = '${directorD.value}'
        LIMIT 10`;
    } else if (writerD.value != '') {
        sql += `SELECT DISTINCT w.primaryName as WriterName, m.primaryTitle as MovieName
        FROM writer w, movie m, movie_writer_relation mw
        WHERE w.writerID = mw.writerID
        AND m.movieID = mw.movieID
        AND w.primaryName = '${writerD.value}'
        LIMIT 10`;
    }
    console.log('Formed SQL Query:' + sql);

    // Make a JSON type object to be sent to server
    let moviename = JSON.stringify({ name: sql});

    // Send the data to server to be processed
    xhr.onload = () => {
        console.log("message received");
    }

    xhr.open('POST', 'http://localhost:5000/queries');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(moviename);
    setTimeout(function() {
        console.log('');
    }, 3000);


    // Change current page to result page
    window.location = 'http://localhost:5000/results';
}
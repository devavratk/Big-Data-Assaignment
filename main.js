// console.log("Printing?");
// console.log(document.querySelector('.header-content'));
console.log(document.querySelector('.header-overlay'));
const myForm = document.querySelector('#searchData');
const butt = document.querySelector('.close-btn');
const typeddata = document.querySelector('.input');
const errmsg = document.querySelector('#errorMess');
// const database = require('mysql');
// const express = require('express');
// let exp = express();

// let db = database.createConnection({
//     host:       'localhost',
//     user:       'root',
//     password:   '374619',
//     database:   'exam1'
// });

// db.connect(() => {
//     console.log('Database connected');
// })

myForm.addEventListener('submit', printdata);
let count = 0;

function printdata(data){
    // We prevent the default behavior which is caused by 'submit' method, i.e. it send the data to file and refresh.
    data.preventDefault();
    
    if (typeddata.value === '') {
        count += 1;
        if (count >= 2) {
            console.log(`Many empty searches, Count:${count}`);
        }
        errmsg.innerHTML = '<h3>Please provide a movie name</h3>';
        setTimeout(() => errmsg.lastChild.remove(), 2000);
    } else {
        console.log(typeddata.value);
    }
    typeddata.value = '';


    // sql = 'SELECT * FROM Bonus';
    // db.query(sql, (err, result) =>{
    //     if (err) throw err;
    //     errmsg.innerHTML = `<p>${result}</p>`;
    // });
}

// Getting all required libraries
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const database = require('mysql');
let exp = express();
const router = express.Router();

// Express body parser and static folders
exp.use('/', router);
exp.use(express.static(__dirname + '/public'));
exp.use(bodyParser.json());
exp.use(express.static(__dirname + '/public/html'));

// This method is called by the main HTML page which search only for movies in Database
exp.post('/ajaxcall', (req, res) => {
    console.log(req.body.name);
    
    let sql = `SELECT * FROM movie WHERE primaryTitle = '${req.body.name}'`;
    console.log(sql)
    
    // Connection with MySQL
    let db = database.createConnection({
        host:       'localhost',
        user:       'root',
        password:   '374619',
        database:   'bigdata'
    });
    console.log('Database connected');

    db.query(sql, (err, result, fields) =>{
        if (err) throw err;

        fs.writeFileSync('datafile.json', JSON.stringify(result))
        // , (err) => {
        //     if (err) throw err;
        // })
        res.send(JSON.stringify(result));
    });
    db.end()
});

// Called by advance search page to gather data from MySQL database
exp.post('/queries', (req, res) => {
    console.log('In this')

    // Connection with MySQL
    let db = database.createConnection({
        host:       'localhost',
        user:       'root',
        password:   '374619',
        database:   'bigdata'
    });

    console.log('Database connected');

    // Firing query
    db.query(req.body.name, (err, result, fields) =>{
        if (err) throw err;

        fs.writeFileSync('datafile.json', JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
    db.end()
});

// Called by html pages to transition from their current page to results page
router.get('/results',function(req,res){
    res.sendFile(path.join(__dirname+'/public/html/results.html'));
});

// This method is called by to show records on screen from JSON 'datafile'
exp.get('/ajaxcall', (req, res) => {
    setTimeout(function() {
        console.log('');
    }, 3000);
    res.send(JSON.parse(fs.readFileSync('datafile.json', 'utf8')));
});

PORT = process.env.PORT | 5000;
exp.listen(PORT, () =>{
    console.log(`Server started at ${PORT}`);
});

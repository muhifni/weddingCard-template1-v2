// menggunakan express
const express = require('express');
const app = express();

// menggunalan mySql
const mysql = require('mysql');

// Menentukan folder untuk menyimpan file CSS dan gambar
app.use(express.static('public'));

// Menghubungkan ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hifni', 
  password: '123321',
  database: 'live_comment',
});

// Notifikasi mysql nonnect or error
connection.connect((err) => {
  if (err) throw err;
  console.log('Horayy... Berhasil konek ke mySql');
});

// Mendapatkan nilai dari table
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  connection.query('SELECT * FROM comment_2', (error, results) => {
    console.log(results);
    res.render('index.ejs', { comment_2: results });
  });
});


//mendapatkan nilai dari table (ajax)
app.get('/getComment', (req, res) => {
  connection.query('SELECT * FROM comment_2', (error, results) => {
    if (error) throw error;
    console.log(results);
    let comment = JSON.stringify(results);
    res.end(comment);
  });
});


// memasukkan comment ke db (ajax)
app.post('/insertComment', (req, res) => {
  let content = '';
  // Mendapatkan nilai input
  req.on('data', function (data) {
    content += data;

    let obj = JSON.parse(content);
    let name = obj.user_name;
    let comment = obj.user_comment;
    let create = 'INSERT INTO comment_2(user_name, user_comment) VALUES(?, ?)';

    console.log('The UserName is: ' + obj.name);
    console.log('The UserComment is: ' + obj.comment);

    connection.query(create, [name, comment], (error, results) => {
      if (error) throw error;
      console.log('komen berhasil ditambahkan :)');
      res.end('Success!');
    });
  });
});


// Menambahkan data ke table mysql
app.post('/create', (req, res) => {
  let name = req.body.userName; // sesuaikan kembali dgn index.ejs
  let comment = req.body.userComments; // sesuaikan kembali dgn index.ejs
  let create = 'INSERT INTO comment_2(user_name, user_comment) VALUES(?, ?)';
  // Mendapatkan nilai input
  connection.query(create, [name, comment], (error, results) => {
    if (error) throw error;
    // redirect ke halaman utama
    // res.redirect('/')
    console.log('komen berhasil ditambahkan :)');
  });
});


// Menjalankan server
app.listen(3005, (err) => {
  if (err) throw err;
  console.log('Connected to NodeJS');
});
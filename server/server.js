const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({encoded: false}));

// app.get('/', (req, res) => {
//     res.send("Hello from the web server side....")
// });
app.use((req, res, next) => {
    console.log(req.url);
    // console.log(req.originalUrl);
    next();
})

let arr = []
app.post('/contact-form', (req, res) => {
    console.log(req.body);

        fs.readFile('log.json', (err, data) => {
            console.log(data)
            if (err) console.log(err);
            let info = JSON.parse(data);
            if (Array.isArray(info)) {
                info.forEach(element => arr.push(element))
            } else {
                arr.push(info)
            }
            arr.push(req.body);
            fs.writeFile('log.json',  JSON.stringify(arr) ,(err) => console.log(err))
        })
    

    res.send("Thank You")
})

app.get('/formsubmissions', (req, res) => {
    fs.readFile('log.json', (err, data) => {
        let info = JSON.parse(data);
        res.send(info)
    })
} )

app.use(express.static(path.join(__dirname, '../public')))

app.listen(3000, () => console.log("Hello from the web server side..."))
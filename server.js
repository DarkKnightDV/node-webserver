const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
            console.log("Unable to log to file.");
    });
    next();
});

//Uncomment for maintenance
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         title: 'Maintenance'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/' , (req , res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        title: 'Home Page',
        message: 'Welcome to my Website'
        // ,currentYear: new Date().getFullYear()
    });
});

app.get('/about' , (req, res) => {
    // res.send({
    //     name: "Pankaj",
    //     location: "singapore",
    //     zip: 650363
    // });
    res.render('about.hbs', {
        title: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to find the page"
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
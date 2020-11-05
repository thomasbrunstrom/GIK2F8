const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');


//Vår första route
app.get('/', (req, res) => { 
    res.send('Hej på dig du!');
});
//Våra produkter

const static = express.static('public');
app.use(express.json());
app.use(static);
app.use('/api/', routes);
app.listen(port, () => {
    console.log(`Vår server lyssnar nu på http://127.0.0.1:${port}/`);
});
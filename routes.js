//Import Router from express to be able to define routes.
const routes = require('express').Router();
const dbQueries = require('./database');
const multer  = require('multer'); //Inkludera multer
const upload = multer({ dest: 'upload/' }); //Vart ska vi spara filer temporärt?
const fs = require("fs").promises; //Inkludera filesystem från node, för att skriva filer

const products = [
    { name: 'product 1', id: 1},
    { name: 'product 2', id: 2}
];

routes.get('/products', (req, res) => {
    //Skicka json som svar
    try {
        throw new Error({'message' : 'trasigt'});
    }
    catch(error) {
        res.json(error);
    }
});

routes.get('/product/', (req, res) => {
    res.json({info: 'This is product endpoint'});
});

routes.get('/product/:id', (req, res) => {
    const product = products.find((p) => {
        return p.id == req.params.id;
    });
    if(product) {
        res.json(product);
    }
    else {
        res.status(404)
            .send(`Product with id: ${req.params.id} not found`);
    }
});
routes.post('/product/', (req, res) => {
    const data = req.body;
    
    const found = products.find((p) => {
        return p.id === data.id;
    });
    if(!found) {
        products.push(data);
        res.json({status: 'ok'});
    } 
    else {
        res.status(400)
            .send(`Dublicate id for product with id: ${data.id}`);
    }
});

routes.get('/users', async (request, response) => {
    try {
        const users = await dbQueries.getUsers();
        response.json(users);
    }
    catch(error) {
        response.send('Något gick fel i routen.');
        //response.send(error);
    }
});

routes.post('/file', upload.single('file'), async (req,res) => {
    const file = req.file; //Uppladdad fil
    //Hämta filändelse
    const exts = req.file.originalname.split('.');
    const fileEnd = exts[exts.length - 1];
    //Skapa vårt filnamn
    const fileName = './public/' + req.body.filename + '.' + fileEnd;
    try {
        //Flytta vår fil
        const filewrite = await fs.rename(file.path, fileName);
        //Om inget fel skicka ok
        if(!filewrite) {
            res.json({'status' : 'ok '});
        }
        else {
            throw error;
        }
    } catch(error) { //Fånga våra fel
        await fs.unlink(file.path); //Ta bort temporär fil
        res.status(400).json(error);
    }
});
module.exports = routes;
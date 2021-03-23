//require modules
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const bodyparser = require('body-parser');
const fetch = require('node-fetch');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.APP_KEY, process.env.ADMIN_KEY)
const index = client.initIndex('products');
const path = require('path')
const productRoute = require('./src/routes/product.route');

//middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//routing

app.use('/api',productRoute)


//server listining
app.listen(process.env.PORT, (request,response)=>{
    if(process.env.HOST !='localhost' && process.env.HOST != '0.0.0.0')
    {
        console.log(`Express server listening on http://${process.env.HOST}:${process.env.PORT}`);
    } else {
        process.env.HOST ='localhost';
        console.log(`Express server listening on http://${process.env.HOST}:${process.env.PORT}`);
    }
});
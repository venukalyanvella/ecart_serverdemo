const express = require('express');
const router = express.Router();
const path = require('path');
const fetch = require('node-fetch');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.APP_KEY, process.env.ADMIN_KEY)
const index = client.initIndex('products');


router.get('/allProducts', (request, response) => {
  let url = `https://fakestoreapi.herokuapp.com/products`
  fetch(url).then((response) => {
      return response.json();
    }).then((products) => {
    //  console.log(products);
      return response.send(products)
    })
    .catch((error) => {
      console.log('Error While getting Data', error);
      return response.send(error)
    })
  index.saveObject(this.result, {
    autoGenerateObjectIDIfNotExist: true
  }, function (err, content) {
    if (err) {
      console.log(err);
    }
  })
})

router.get('/search', (request, response) => {
  const query = request.params.query;

  index.search(query)
    .then(({hits }) => {
        console.log(hits);
         return response.send(hits)
      })
    .catch(error => {
        response.send(error)
      })

})
router.get('/home',(request,response)=>{
        response.sendFile(path.join(__dirname+ '../../public/index.html'))
})
router.get('/login',(request,response)=>{
    response.sendFile(path.join(__dirname+ '../../public/login.html'))
  })

module.exports = router;

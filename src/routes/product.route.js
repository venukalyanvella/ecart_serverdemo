const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/allProducts', (request, response) => {
  let url = `https://fakestoreapi.herokuapp.com/products`
  fetch(url).then((response) => {
      return response.json();
    }).then((products) => {
     console.log(products);
      return res.send(products)
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
         return res.send(hits)
      })
    .catch(error => {
        response.send(error)
      })

})
router.get('/',(request,response)=>{
        response.sendFile(path.join(__dirname+ '/index.html'))
})

module.exports = router;

const sauce = require('../models/sauce');

exports.getAllSauces = (req,res) =>{
    sauce.showSauces().then(
      (products) => {
        const mappedProducts = products.map((product) => {
          product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
          return product;
        });
        res.status(200).json(mappedProducts);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    );
  };

  exports.getOneSauce = (req, res) => {
    sauce.findSauce(req.params.userId).then(
      (product) => {
        if (!product) {
          return res.status(404).send(new Error('Product not found!'));
        }
        product.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + product.imageUrl;
        res.status(200).json(product);
      }
    ).catch(
      () => {
        res.status(500).send(new Error('Database error!'));
      }
    )
  };

  exports.postSauce = (req, res) => {

  };
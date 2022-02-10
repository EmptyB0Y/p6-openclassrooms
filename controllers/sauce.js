const Sauce = require('../models/sauce');
const mongoose = require('mongoose');

exports.getAllSauces = (req,res) =>{
  mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
  useUnifiedTopology: true }).then(() =>{
  Sauce.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });
  };

  exports.getOneSauce = (req, res) => {
    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true }).then(() =>{
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    });
  };

  exports.postSauce = (req, res) => {
    if (!req.body.sauce || !req.body.image) {
      return res.status(400).send(new Error('Bad request!'));
    }
    //Initialiazing response promise
    const queryPromise = new Promise((resolve, reject) => {
       count = 0;
      for(let i in req.body){
        count +=1;
      }

      if(req.body.sauce && req.body.image && count == 2){

        mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
        { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => {

          console.log('Connexion à MongoDB réussie !')

          const sauce = new Sauce({...req.body});

          sauce.save().then(() => {
            console.log("Objet créé !");
            resolve('Objet créé !');
          })
          .catch(error => res.status(400).json({error}));
        })
        .catch(() => {
          console.log('Connexion à MongoDB échouée !');
          reject('Connexion à MongoDB échouée !');
      });
      }
      else{
        reject("Error !");
      }
    });
    //Using response promise
    queryPromise.then(
      (msg) =>{
      return res.status(201).json(msg);
      }
    )
    .catch(
      (error) =>{
      return res.status(500).json(error);
      }
    );
  };
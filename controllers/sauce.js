const Sauce = require('../models/sauce');
const mongoose = require('mongoose');

exports.getAllSauces = (req,res) =>{
  mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
  useUnifiedTopology: true }).then(() =>{
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
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

    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => {

          console.log('Connexion à MongoDB réussie !')

          const sauce = new Sauce({...req.body});

          sauce.save().then(() => {
            res.status(201).json({message: "Objet créé !"});
          })
          .catch(() => res.status(400).json({message: "Erreur lors de la création de l'objet !"}));
        })
        .catch(() => {
          console.log('Connexion à MongoDB échouée !');
          reject('Connexion à MongoDB échouée !');
      });
  };

  exports.editSauce = (req,res) => {
    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({message: 'Impossible de se connecter à la base de donnée !'}));
  };

  exports.deleteSauce = (req,res) => {
    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({message: 'Impossible de se connecter à la base de donnée !'}));
  };

  exports.postLike = (req,res) => {
    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      if(req.body.like && req.body.like == 1 || req.body.like == -1){
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          sauce.usersLiked += req.body.like;
          Sauce.updateOne({ _id: req.params.id }, { sauce, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Like ajouté !'}))
          .catch(() => res.status(400).json({ message: 'Erreur lors de l\'ajout du like !'}))
        })
        .catch(() => res.status(404).json({ message: "Objet non trouvé !" }));
      }
      else{
        console.log("bad request"); 
        return res.status(400).send(new Error('Bad request!'));
      }
    })
    .catch(() => res.status(404).json({message: 'Impossible de se connecter à la base de donnée !'}));

  };
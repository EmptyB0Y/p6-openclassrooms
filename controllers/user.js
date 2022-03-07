const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req,res) =>{
  if (!req.body.email || !req.body.password) {
    return res.status(400).send(new Error('Bad request!'));
  }
  
  mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
  useUnifiedTopology: true }).then(() =>{
    User.findOne({ email: req.body.email })
    .then(user => {
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'HyperSecretiveTokenNoOneKnowsAbout',
              { expiresIn: '24h' }
            )    
          });
        })
        .catch(() => res.status(404).json({ error: 'Utilisateur non trouvé !' }));
    })
}).catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
  
};

  exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(new Error('Bad request!'));
      }

    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
        //Utilisation de Bcrypt pour hasher le mot de passe
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        console.log(hash);
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(() => res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur !' }));
        })
        .catch(() => res.status(500).json({ message: 'Erreur lors du hashage du mot de passe !' }));
        })
    .catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
};

exports.delete = (req, res) =>{
 
  mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/Groupomania?retryWrites=true&w=majority',
  { useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() =>{
      User.deleteOne({_id : req.body.userId})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
};
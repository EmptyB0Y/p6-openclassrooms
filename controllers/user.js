const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

getAuth = () =>{
  return "mongodb+srv://"+String(process.env.DB_USERNAME)+":"+String(process.env.DB_USERPASS)+"@"+String(process.env.DB_CLUSTERNAME)+".ukoxa.mongodb.net/"+String(process.env.DB_NAME)+"?retryWrites=true&w=majority";
}

exports.login = (req,res) =>{
  if (!req.body.email || !req.body.password) {
    return res.status(400).send(new Error('Bad request!'));
  }
  
  mongoose.connect(getAuth(),
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
              process.env.JSON_TOKEN,
              { expiresIn: '24h' }
            )    
          });
        })
        .catch((e) => res.status(404).json({ message: 'Utilisateur non trouvé !', error: e}));
    })
}).catch((e) => res.status(500).json({message: "Connexion à MongoDB échouée !", error: e}));
  
};

  exports.register = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(new Error('Bad request!'));
      }

    mongoose.connect(getAuth(),
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
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((e) => res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur !', error: e}));
        })
        .catch((e) => res.status(500).json({ message: 'Erreur lors du hashage du mot de passe !', error: e}));
        })
    .catch((e) => res.status(500).json({message: "Connexion à MongoDB échouée !", error: e}));
};

exports.delete = (req, res) =>{
 
  mongoose.connect(getAuth(),
  { useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() =>{
      User.deleteOne({_id : req.body.userId})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  })
  .catch((e) => res.status(500).json({message: "Connexion à MongoDB échouée !", error: e}));
};
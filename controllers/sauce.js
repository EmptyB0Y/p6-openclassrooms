const Sauce = require('../models/sauce');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');

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

      /*sauce format : 
      {"name":"...",
      "manufacturer":"...",
      "description":"...",
      "mainPepper":"...",
      "heat":<Number>}*/

    if (!req.body.sauce) {
      return res.status(400).send(new Error('Bad request!'));
    }

    if (res.locals.userId !== req.body.userId){
      return res.status(401).json({message: "Unauthorized !"});
    }

    let sauceCreated = JSON.parse(req.body.sauce);

    if(req.file){
      sauceCreated.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    if(sauceCreated.heat == isNaN){
      return res.status(400).send(new Error('Bad request!'));
    }

    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => {

          console.log('Connexion à MongoDB réussie !')

          const sauce = new Sauce({ ...sauceCreated });

          sauce.save().then(() => {
            res.status(201).json({message: "Objet créé !"});
          })
          .catch(() => res.status(500).json({message: "Erreur lors de la création de l'objet !"}));
        })
        .catch(() => {
          console.log('Connexion à MongoDB échouée !');
          res.status(500).json({message: "Connexion à MongoDB échouée !"})
      });
  };

  exports.editSauce = (req,res) => {

    let ok = true;
    if ((req.body.name &&  
      req.body.heat && 
      req.body.mainPepper && 
      req.body.manufacturer && 
      req.body.description &&
      !req.body.likes &&
      !req.body.dislikes &&
      !req.body.usersLiked &&
      !req.body.usersDisliked) || req.body.sauce) {
      ok = true;
    }
    else{
      ok = false;
    }

    if(!ok){
    return res.status(400).send(new Error('Bad request!'));
    }

    if (res.locals.userId !== req.body.userId){
      return res.status(401).json({message: "Unauthorized !"});
    }
    
    let sauceModified;
    if(req.body.sauce){
      /*sauce format : 
      {"name":"...",
      "manufacturer":"...",
      "description":"...",
      "mainPepper":"...",
      "heat":<Number>}*/
      
      sauceModified = JSON.parse(req.body.sauce);
    }
    else{
      sauceModified = { ...req.body};
    }
    if(req.file){
      sauceModified.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    mongoose.connect('mongodb+srv://user0:p4ssw0rd@cluster0.ukoxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      Sauce.updateOne({ _id: req.params.id }, { ...sauceModified, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(() => res.status(404).json({message: 'Impossible de se connecter à la base de donnée !'}));
  };

  exports.deleteSauce = (req,res) => {
    if (!req.body.userId) {
      return res.status(400).send(new Error('Bad request!'));
    }

    if (res.locals.userId !== req.body.userId){
      return res.status(401).json({message: "Unauthorized !"});
    }

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
      if(req.body.like && req.body.like <= 1 || req.body.like >= -1){
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          if(sauce.userId === res.locals.userId){
            return res.status(401).json({message: "Unauthorized !"});
          }
          //Like
          if(req.body.like == 1){
            if(!sauce.usersLiked.includes(res.locals.userId)){
              sauce.likes += 1;
              sauce.usersLiked.push(res.locals.userId);

              if(sauce.usersDisliked.includes(res.locals.userId)){
                sauce.dislikes -= 1;
                sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(res.locals.userId));
              }
            }
            else{
              return res.status(401).json({message: "Unauthorized !"});
            }
            /*else{
              sauce.likes -= 1;
              sauce.usersLiked.splice(sauce.usersLiked.indexOf(res.locals.userId));
            }*/
          }
          //Dislike
          else if(req.body.like == -1){
            if(!sauce.usersDisliked.includes(res.locals.userId)){
              sauce.dislikes += 1;
              sauce.usersDisliked.push(res.locals.userId);

              if(sauce.usersLiked.includes(res.locals.userId)){
                sauce.likes -= 1;
                sauce.usersLiked.splice(sauce.usersLiked.indexOf(res.locals.userId));
              }
            }
            else{
              return res.status(401).json({message: "Unauthorized !"});
            }
            /*else{
              sauce.dislikes -= 1;
              sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(res.locals.userId));  
            }*/
          }
          //Remove like or dislike
          else if(req.body.like == 0){
            if(sauce.usersDisliked.includes(res.locals.userId)){
              sauce.dislikes -= 1;
              sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(res.locals.userId)); 
            }
            else if(sauce.usersLiked.includes(res.locals.userId)){
              sauce.likes -= 1;
              sauce.usersLiked.splice(sauce.usersLiked.indexOf(res.locals.userId));
            }
            else{
              return res.status(401).json({message: "Unauthorized !"});
            }
          }
          let sauceLiked = {
              "userId" : sauce.userId,
              "name" : sauce.name,
              "manufacturer" : sauce.manufacturer,
              "description" : sauce.description,
              "mainPepper" : sauce.mainPepper,
              "imageUrl" : sauce.imageUrl,
              "heat" : sauce.heat,
              "likes" : sauce.likes,
              "dislikes" : sauce.dislikes,
              "usersLiked" : sauce.usersLiked,
              "usersDisliked" : sauce.usersDisliked
        };
        console.log(sauceLiked);
        Sauce.updateOne({ _id: req.params.id }, { ...sauceLiked, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Like ajouté !'}))
          .catch(() => res.status(400).json({ message: 'Erreur lors de l\'ajout du like !'}));
        })
        .catch(() => res.status(404).json({ message: "Objet non trouvé  !" }));
      }
      else{
        console.log("bad request"); 
        return res.status(400).send(new Error('Bad request!'));
      }
    })
    .catch(() => res.status(404).json({message: 'Impossible de se connecter à la base de donnée !'}));
  };
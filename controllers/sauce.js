const Sauce = require('../models/sauce');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth');
const fs = require('fs');

getAuth = () =>{
  const AUTH = "mongodb+srv://"+String(process.env.DB_USERNAME)+":"+String(process.env.DB_USERPASS)+"@"+String(process.env.DB_CLUSTERNAME)+".ukoxa.mongodb.net/"+String(process.env.DB_NAME)+"?retryWrites=true&w=majority";
  return AUTH;
}

exports.getAllSauces = (req,res) =>{
  
  mongoose.connect(getAuth(),
  { useNewUrlParser: true,
  useUnifiedTopology: true }).then(() =>{
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(() => error => res.status(400).json({ error }));
  })
  .catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
  };

  exports.getOneSauce = (req, res) => {
    mongoose.connect(getAuth(),
    { useNewUrlParser: true,
    useUnifiedTopology: true }).then(() =>{
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    }).catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));

  };

  exports.postSauce = (req, res) => {

      /*sauce format : 
      {"name":"...",
      "manufacturer":"...",
      "description":"...",
      "mainPepper":"...",
      "heat":<Number>}*/

    if (!req.body.sauce) {
      return res.status(400).send(
        `sauce : {"userId":String,
        "name":String,
        "manufacturer":String,
        "description":String,
        "mainPepper":String,
        "heat":Int}`
        );
    }

    let sauceCreated = JSON.parse(req.body.sauce);

    if(sauceCreated.userId !== res.locals.userId){
      return res.status(401).send(new Error('Unauthorized !'));
    }

    if(req.file){
      sauceCreated.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    if(sauceCreated.heat == isNaN){
      return res.status(400).send(new Error('Bad request!'));
    }

    mongoose.connect(getAuth(),
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => {

          const sauce = new Sauce({ ...sauceCreated });

          sauce.save().then(() => {
            res.status(201).json({message: sauceCreated});
          })
          .catch(() => {

            if(req.file){
              if(sauceCreated.imageUrl !== "noimage"){
                fs.unlink('../back/images/' + sauceCreated.imageUrl.split('/images/')[1], (err) => {
                  if (err) {
                    console.error(err)
                  }
                })
              }
            }
            res.status(500).json({message: "Erreur lors de la création de l'objet !"})
        });
        })
        .catch(() => {

          if(req.file){
            if(sauceCreated.imageUrl !== "noimage"){
              fs.unlink('../back/images/' + sauceCreated.imageUrl.split('/images/')[1], (err) => {
                if (err) {
                  console.error(err)
                }
              })
            }
          }
          res.status(500).json({message: "Connexion à MongoDB échouée !"})
      });
  };

  exports.editSauce = (req,res) => {

    if (!(req.body.name &&  
      req.body.heat && 
      req.body.mainPepper && 
      req.body.manufacturer && 
      req.body.description &&
      !req.body.likes &&
      !req.body.dislikes &&
      !req.body.usersLiked &&
      !req.body.usersDisliked) && !req.body.sauce) {

      return res.status(400).send(
      `sauce : {"name":String,
      "manufacturer":String,
      "description":String,
      "mainPepper":String,
      "heat":Int}`
      );
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
      sauceModified.userId = req.body.userId;
    }
    else{
      sauceModified = { ...req.body};
    }
    if(req.file){
      sauceModified.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    mongoose.connect(getAuth(),
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      Sauce.findOne({_id : req.params.id})
      .then(sauce => {

        if (res.locals.userId !== sauce.userId){
          return res.status(401).send(new Error('Unauthorized !'));
        }

        if(req.file){
          if(sauce.imageUrl !== "noimage"){
            fs.unlink('../back/images/' + sauce.imageUrl.split('/images/')[1], (err) => {
              if (err) {
                console.error(err)
              }
            })
          }
        }
      
        Sauce.updateOne({ _id: req.params.id }, { ...sauceModified, _id: req.params.id })
        .then(() => res.status(200).json({ message: sauceModified}))
        .catch(error => {
          if(req.file){
            if(sauceModified.imageUrl !== "noimage"){
              fs.unlink('../back/images/' + sauceModified.imageUrl.split('/images/')[1], (err) => {
                if (err) {
                  console.error(err)
                }
              })
            }
          }
          res.status(400).json({ error })
        });
      })
      .catch(error => res.status(404).json({ error }));
    })
    .catch(() => {
      if(req.file){
        if(sauceModified.imageUrl !== "noimage"){
          fs.unlink('../back/images/' + sauceModified.imageUrl.split('/images/')[1], (err) => {
            if (err) {
              console.error(err)
            }
          })
        }
      }
      res.status(500).json({message: "Connexion à MongoDB échouée !"})
    });
  };

  exports.deleteSauce = (req,res) => {

    mongoose.connect(getAuth(),
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      Sauce.findOne({ _id: req.params.id })
        .then(sauce => {

          if (res.locals.userId !== sauce.userId){
            return res.status(401).send(new Error('Unauthorized !'));
          }

          if(sauce.imageUrl !== "noimage"){
            fs.unlink('../back/images/' + sauce.imageUrl.split('/images/')[1], (err) => {
              if (err) {
                console.error(err)
              }
            })
          }
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !"}))
          .catch(error => res.status(400).json({ error }));
          
        })
        .catch(error => {
          console.log(error);
          return res.status(404).json({ message: "Objet non trouvé  !" });
        });
    })
    .catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
  };

  exports.postLike = (req,res) => {
    if(!req.body.like){
      return res.status(400).send(new Error('Bad request!'));
    }
    mongoose.connect(getAuth(),
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() =>{
      if(req.body.like && req.body.like <= 1 || req.body.like >= -1){
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
          //Suggestion : Un utilisateur ne peut pas liker ou disliker sa propre sauce
          /*if(sauce.userId === res.locals.userId){
            return res.status(401).send(new Error('Unauthorized !'));
          }*/
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
              return res.status(401).send(new Error('Unauthorized !'));
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
              return res.status(401).send(new Error('Unauthorized !'));
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
              return res.status(401).send(new Error('Unauthorized !'));
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

        Sauce.updateOne({ _id: req.params.id }, { ...sauceLiked, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Like ajouté !'}))
          .catch(() => res.status(400).json({ message: 'Erreur lors de l\'ajout du like !'}));
        })
        .catch(() => res.status(404).json({ message: "Objet non trouvé  !" }));
      }
      else{
        return res.status(400).send(new Error('Bad request!'));
      }
    })
    .catch(() => res.status(500).json({message: "Connexion à MongoDB échouée !"}));
  };
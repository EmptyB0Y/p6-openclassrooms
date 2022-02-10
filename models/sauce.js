const mongoose = require('mongoose');

const sauces = [
    {
        "userId" : "5315438",
        "name" : "testname1",
        "manufacturer" : "testmanufacturer1",
        "description" : "Testing 1",
        "mainPepper" : "pepper",
        "imageUrl" : "image.png",
        "heat" : 1,
        "likes" : 3,
        "dislikes" : 5,
        "usersLiked" : [],
        "usersDisliked" : []
    },
    {
        "userId" : "5431215",
        "name" : "testname2",
        "manufacturer" : "testmanufacturer2",
        "description" : "Testing 2",
        "mainPepper" : "pepper",
        "imageUrl" : "image.png",
        "heat" : 5,
        "likes" : 2,
        "dislikes" : 1,
        "usersLiked" : [],
        "usersDisliked" : []
    },
    {
        "userId" : "5541618",
        "name" : "testname3",
        "manufacturer" : "testmanufacturer3",
        "description" : "Testing 3",
        "mainPepper" : "pepper",
        "imageUrl" : "image.png",
        "heat" : 2,
        "likes" : 3,
        "dislikes" : 1,
        "usersLiked" : [],
        "usersDisliked" : []
    }
];

exports.showSauces = () => {
    return new Promise((resolve,reject)=>resolve(JSON.parse(JSON.stringify(sauces))));
}

exports.findSauce = (id) => {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(JSON.stringify(sauces)).find(sauce =>
        sauce._id == id)
      )
    );
  }

  const sauceSchema = mongoose.Schema({ 
    sauce: { type: String, required: true },
    image: { type: String, required: true },
    usersLiked: { type: Number, required: false, default: 0 },
    usersDisliked: { type: Number, required: false, default: 0 },
  });
  
  module.exports = mongoose.model('sauce', sauceSchema);
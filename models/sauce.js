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
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    mainPepper: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false, default: 0 },
    dislikes: { type: Number, required: false, default: 0 },
    usersLiked: { type: Array, required: false, default: [] },
    usersDisliked: { type: Array, required: false, default: [] },
  });
  
  module.exports = mongoose.model('sauce', sauceSchema);
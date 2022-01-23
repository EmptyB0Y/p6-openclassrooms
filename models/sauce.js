/*const { Sequelize } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: '../database.sqlite'
  });
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}*/
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
        "manufacturer" : "testmanfacturer3",
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

const users = [
    {
        "email" : "",
        "password" : ""
    },
    {
        "email" : "",
        "password" : ""
    },
    {
        "email" : "",
        "password" : ""
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
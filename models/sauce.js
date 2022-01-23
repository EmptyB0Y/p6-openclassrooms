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
        "userId" : "",
        "name" : "",
        "manufacturer" : "",
        "description" : "",
        "mainPepper" : "",
        "imageUrl" : "",
        "heat" : 0,
        "likes" : 0,
        "dislikes" : 0,
        "usersLiked" : [],
        "usersDisliked" : []
    },
    {
        "userId" : "",
        "name" : "",
        "manufacturer" : "",
        "description" : "",
        "mainPepper" : "",
        "imageUrl" : "",
        "heat" : 0,
        "likes" : 0,
        "dislikes" : 0,
        "usersLiked" : [],
        "usersDisliked" : []
    },
    {
        "userId" : "",
        "name" : "",
        "manufacturer" : "",
        "description" : "",
        "mainPepper" : "",
        "imageUrl" : "",
        "heat" : 0,
        "likes" : 0,
        "dislikes" : 0,
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

exports.showSauces = () =>{
    return new Promise((resolve,reject)=>resolve(JSON.parse(JSON.stringify(sauces))));
}

exports.findSauce = (id) => {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(JSON.stringify(sauces)).find(sauce =>
        sauce._id == id)
      )
    );
  }
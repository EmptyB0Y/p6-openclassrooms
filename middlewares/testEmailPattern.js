
module.exports = (req, res, next) => {
    const regex = /^[A-Za-z0-9_-]+@\w+\.[a-z]+$/;

    if(!regex.test(req.body.email)){
        res.status(400).json({error : 'Invalid email format'});
    }
    else{
        next();
    }

};
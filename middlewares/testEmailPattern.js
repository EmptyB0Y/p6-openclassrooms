module.exports = (req, res, next) => {
    const emailValid = /^[A-Za-z0-9_-]+@\w+\.[a-z]+$/;

    if(!emailValid.test(req.body.email)){
        res.status(400).json({error : 'Invalid email format'});
    }
    else{
        next();
    }

};
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    // const { authorization } = req.headers;
    console.log(req.headers.authorization)
    // const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== 'Bearer') {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
        return;
    }

    try {
        const {_id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(_id);
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
        return;
    }

};

module.exports = authenticate;
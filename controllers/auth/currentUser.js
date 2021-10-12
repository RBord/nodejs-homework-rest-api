const { User } = require('../../models');

const currentUser = async (req, res) => {
    const { _id, email } = req.user;
    await User.findOne(_id);
    res.json({
        status: 'succes',
        code: 200,
        message: `Current user - ${email}`
    })
};

module.exports = currentUser;
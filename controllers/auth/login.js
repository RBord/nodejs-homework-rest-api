const { User } = require('../../models');
const { NotFound, BadRequest } = require('http-errors');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, '_id email password');
    if (!user || !user.comparePassword(password)) {
        throw new BadRequest('Invalid email or password');
    }
    // if (!user) {
    //     throw new NotFound(`Email ${email} not found`);
    // }
    // if (!user.comparePassword(password)) {
    //     throw new BadRequest('Invalid password');
    // }
    const token = 'sdlgsdgsdg.sdgsdgsdgsdg.sgsdgsgsdgrg';
    res.json({
        status: 'succes',
        code: 200,
        data: {
            token
        }
    })
};

module.exports = login;
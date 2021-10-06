const { User } = require('../models');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
};

const login = async (req, res) => {
    
};

const logout = async (req, res) => {
    
};

module.exports = {
    register,
    login,
    logout
}
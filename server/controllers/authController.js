const users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res) => {
        const { username, password} = req.body;

        const checkUser = users.find(user => user.username === username && user.password === password);

        if (checkUser) {
            res.status(200).send(req.session.user);
        } else {
            res.status(500).send('either username or password is not valid');
        };
    },
    register: (req, res) => {
        const { username, password } = req.body;
        const newUser = {
            id: id++,
            username,
            password
        };
        users.push(newUser);

        req.session.user.username = username;
        req.session.user.username = password;

        res.status(200).send(req.session.user);
    },
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user);
    }
}
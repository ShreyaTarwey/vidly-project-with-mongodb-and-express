const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Invalid Token...');
    try {
        const result = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = result;
        next()
    } catch (ex) {
        res.status(400).send('Invalid Token....')
    }

}
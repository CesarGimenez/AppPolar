let jwt = require('jwt-simple');
let moment = require('moment');

var secret = 'cesar';

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        nombre: user.nombre,
        email: user.email,
        categ: user.categoria,
        iat: moment().unix(),
        expo: moment().add(30, 'days').unix(),
    }
    return jwt.encode(payload, secret);
}
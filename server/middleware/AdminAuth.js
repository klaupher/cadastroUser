const jwt = require('jsonwebtoken');

const secret = 'asdjalsfgalulewfkjakjfalksjfhlaksjfwjqkfb';
module.exports = function(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        
        try {
            const decode = jwt.verify(token, secret);
            if (decode.role == 1)
                next();
            else {
                res.status(403);
                res.json("Vc não tem permissao!!");
            }
            
        } catch (error) {
            res.status(403);
            res.json("Vc não está autenticado");
        }
    }
        
    else {
        res.status(403);
        res.json("Vc não está autenticado");
    }
};

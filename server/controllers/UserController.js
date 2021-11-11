const User = require("../models/User");
const PwdToken = require("../models/PwdToken");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret = 'asdjalsfgalulewfkjakjfalksjfhlaksjfwjqkfb';
class UserController {

    async index(req, res) {
        res.json(await User.findAll());
    }

    async findUser(req, res) {
        const id = req.params.id;
        const user = await User.findById(id);
        if(user.length == 0){
            res.status(404);
            res.json({});
            return;
        }
        res.status(200);
        res.json(user);
    }   

    async create(req, res) {
        const { email, name, password } = req.body;

        if (email == undefined || email == '' || email == ' ') {
            res.status(400);
            res.json({err: 'Email inválido..'});
            console.log('Email inválido - ' + Date.now());
            return;
        }
        
        if (await User.findEmail(email)) {
            res.status(406);
            res.json("Email já existente...");
            return;
        }

        await User.new(email, name, password);

        res.status(200);
        res.send('Pegando o corpo da requisição');
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id, email,name,role);
        if (result != undefined) {
            if (result.status) {
                res.json( "OK");
            } 
            else {
                res.status(406);
                res.json({err: result.err});
            }
        }
        else {
            res.status(406);
            res.json("Erro in server...");
        }
    }
     
    async remove(req,res){
        const id = req.params.id;
        const result = await User.delete(id);
        if (result.status)
            res.json("OK");
        else {
            res.status(404);
            res.json(result.err);
        }

    }

    async recoverPassword(req, res) {
        const email = req.body.email;
        const result = await PwdToken.create(email);
        if(result.status) {
            console.log(result.token);
            res.json(result.token.toString());
        }
        else {
            res.status(406);
            res.json(result.err);
        }
    }

    async changePassword(req, res) {
        const {token, password } = req.body;
        console.log("Token recebido " + token)
        const tk = await PwdToken.validade(token);
        if (!tk.status) {
            res.status(406);
            res.json("Token inválido");
            return;
        }
        console.log(tk);
        try {
            await User.changePwd(password, tk.token.user_id, tk.token.token);
            res.json("Senha alterada");

        } catch (err) {
            res.status(400);
            res.json("Error => " + err);
        }

    }

    async login(req, res) {
        const {email, password} = req.body;

        const user = await User.findByEmail(email);
        if (user == undefined || user.length == 0)
        {
            res.status(400)
            res.json({status: false, err: "Email inválido."});
            return;
        }

        const compare = await bcrypt.compare(password, user.password);

        if (compare) {
            const newToken = jwt.sign({
                email: user.email,
                role: user.role
            }, secret);
            res.status(200);
            res.json({token: newToken});
        }
        else{
            res.status(406);
            res.json({status: false, err: "Senha incorreta"});
        }

    }


}

module.exports = new UserController();

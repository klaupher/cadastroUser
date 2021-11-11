const User = require('./User');
const knex = require('../knexfile');
class PwdToken {
    async create(email) {
        const user = await User.findByEmail(email);

        if ((user == undefined) || (user.length == 0)) {
            return { status: false, err: "E-Mail inválido..." };
        }

        try {

            const token = Date.now().toString();

            await knex.insert({
                user_id: parseInt(user.id),
                used: 0,
                token: token  //UUID
            }).table("pwdtokens");

            return { status: true, token: token }

        } catch (err) {
            console.log(err);
            return { status: false, err: err }
        }

    }
    async validade(token) {
        try {
            const result = await knex.select().where({ token: token }).table("pwdtokens");
            if (result.lenght = 0) {
                return { status: false };
            }
            const tk = result[0];

            if (tk.used)
                return { status: false, err: "Token inválido" }
                
            return { status: true, token: tk }

        } catch (error) {
            console.log(error);
            return { status: false };
        }
    }

    async setUsed(token) {
        await knex.update({ used: 1 }).where({ token: token }).table("pwdtokens");
    }

}

module.exports = new PwdToken()

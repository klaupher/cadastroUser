const knexfile = require("../knexfile");
const bcrypt = require("bcrypt");
const { default: knex } = require("knex");
const PwdToken = require("./PwdToken");


class User {
    async new(email, name, password) {

        try {

            var hash = await bcrypt.hash(password, 10);
            await knexfile.insert({ email, name, password: hash, role: 0 }).table("users");

        } catch (err) {
            console.log('Error - ' + err)
        }
    }

    async findEmail(email) {
        try {
            const result = await knexfile.select('*').from('users').where({ email: email });
            return (result.length > 0) ? true : false;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async findAll() {
        try {
            return await knexfile.select(["id", "name", "email", "role"]).table("users");
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findById(idUser) {
        try {
            return (await knexfile.select(["id", "name", "email", "role"]).where({ id: idUser }).table("users"))[0];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findByEmail(mailUser) {
        try {
            return (await knexfile.select("*").where({ email: mailUser }).table("users"))[0];
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    async update(id, email, nome, role) {
        const user = (await this.findById(id));
        const editUser = {};
        if (user == undefined) {
            return { status: false, err: "Usuário não existe!!" };
        }


        if (email != undefined) {
            if (email != user.email) {
                if ((await this.findEmail(email)) && (user.id != id)) {
                    console.log(user);
                    return { status: false, err: "Email já cadastrado" };
                }
            }
            else
                editUser.email = email;
        }

        if (nome != undefined) editUser.name = nome;
        if (role != undefined) editUser.role = role;

        try {
            await knexfile.update(editUser).where({ id: id }).table("users");
            return { status: true }
        } catch (err) {
            return { status: false, err: "Error - " + err };
        }
    }

    async delete(id) {
        const user = await this.findById(id);
        if (user == undefined) {
            return { status: false, err: "Usuário não existe!!" };
        }
        try {
            await knexfile.delete().where({ id: id }).table("users");
            return { status: true }
        } catch (err) {
            return { status: false, err: "Error - " + err };
        }
    }

    async changePwd(newPwd, id, token) {
        const hash = await bcrypt.hash(newPwd, 10);
        await knexfile.update({ password: hash }).where({ id: id }).table("users");
        await PwdToken.setUsed(token);
    }
}


module.exports = new User();
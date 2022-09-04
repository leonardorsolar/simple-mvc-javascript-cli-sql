const conect = require('../config/database');
class User {

    constructor(name, email, password) {
        this.name = String(name);
        this.email = String(email);
        this.password = String(password);
    }

    static async findByPk(id) {
        try {
            const result = await conect.promise().query(`SELECT * FROM users WHERE id = ${id};`);
            return result[0][0];
        } catch (error) {
            return error;
        }
    }

    static async create(user) {
        try {
            const result = await conect.promise().query(`INSERT INTO users SET ?`, [user]);
            return result;   
        } catch (error) {
            return error;
        }
    }

    static async update(user, id) {
        try {
            const result = await conect.promise().query(`UPDATE users SET ? WHERE id = ?`, [user, id]);
            return result;   
        } catch (error) {
            return error;
        }
    }

    static async findAll(limit = 21) {
        try {
            const result = await conect.promise().query(`SELECT * FROM users LIMIT ${limit}`);
            return result[0];   
        } catch (error) {
            return error;
        }
    }

    static async destroy(id) {
        try {
            const result = await conect.promise().query(`DELETE FROM users WHERE id = ${id}`);
            return result;
        } catch (error) {
            return error;
        }
    }
}

module.exports = User;
const User = require('../models/User');
const Success = Symbol(2);

module.exports = {
  
    show: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return `Usuário ${id} não existe`;
            }
            return user;
        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    },

    store: async (name, email, password) => {
        try {
            const user = new User(name, email, password);
            const result = User.create(user);
            return result;
        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    },

    index: async (limit = 21) => {
        try {
            const users = await User.findAll(limit);
            return users;
        } catch (error) {
            console.error(error.message);
            return error.message; 
        }
    },

    destroy: async (id)=>{
        try {

            const userExist = await User.findByPk(id);
            if (userExist) {
                const result = await User.destroy(id);
                return result;
            }
            
            return `Usuário ${id} não existe`;

        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    },

    update: async (name, email, password, id) => {
        try {

            const userExist = await User.findByPk(id);
            if (userExist) {
                const user = new User(name, email, password);
                const result = User.update(user, id);
                return result;
            }
            
            return `Usuário ${id} não existe`;

        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    }

};
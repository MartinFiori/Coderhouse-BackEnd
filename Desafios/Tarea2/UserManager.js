const fs = require('fs');

/*
Schema
    user = {
        first_name: String (required),
        last_name: String,
        user_name: String (unique) (required),
        age: Number,
        mail: String (unique) (required),
    }
*/

const pathToUsers = './files/users.json';
class UserManager {
    // Creating the user
    createUser = async (user) => {
        if (!user) return {
            status: "error",
            message: "User Missing"
        }
        if (!user.first_name || !user.user_name || !user.mail) return {
            status: "error",
            error: "missing field"
        }
        try {
            if (fs.existsSync(pathToUsers)) {
                let data = await fs.promises.readFile(pathToUsers, "UTF-8", null, 2)
                let users = JSON.parse(data)
                let newId = users[users.length - 1].id + 1
                user.id = newId;
                users.push(user);
                await fs.promises.writeFile(pathToUsers, JSON.stringify(users, null, 2))
                return {
                    status: "success",
                    message: "New user created!"
                };
            } else {
                user.id = 1
                await fs.promises.writeFile(pathToUsers, JSON.stringify([user], null, 2))
                return {
                    status: "success",
                    message: "First user created"
                }
            }
        } catch (err) {
            return {
                status: "error",
                message: "va igual de bien que el país"
            }
        }
    }
    // Get an array of the users created
    findAllUsers = async () => {
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, "utf-8", null, 2);
            let users = JSON.parse(data);
            return {
                status: "success",
                usersFound: users
            }
        }
        return {
            status: "error",
            message: "no users registered"
        }
    }
    // Searcher of 1 user according to its id
    findById = async (id) => {
        if (!id) return {
            status: "error",
            message: "id missing"
        }
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, 'utf-8', null, 2)
            let users = JSON.parse(data)
            let userFound = users.find(x => x.id === parseInt(id))
            if (userFound) return {
                status: "success",
                message: userFound
            }
            else return {
                status: "error",
                message: "User not Found"
            }
        }
    }
    // Deleting 1 user according to its id
    deleteById = async (id) => {
        if (!id) return {
            status: "error",
            message: "id missing"
        }
        let data = await fs.promises.readFile(pathToUsers, 'utf-8', null, 2)
        let users = JSON.parse(data)
        let deletedUser = users.filter(x => x.id !== parseInt(id))
        await fs.promises.writeFile(pathToUsers, JSON.stringify(deletedUser, null, 2))
        return {
            status: "success",
            message: deletedUser
        }
    }
    // Updating user's values
    updateUser = async (id, updatedUser) => {
        if (!id) return {
            status: "error",
            error: "id needed"
        }
        if (fs.existsSync(pathToUsers)) {
            let data = await fs.promises.readFile(pathToUsers, 'utf-8', null, 2)
            let users = JSON.parse(data)
            let newUsers = users.map(user => {
                if (user.id === parseInt(id)) {
                    // This will be the user updated from index.js
                    updatedUser.id = id
                    return updatedUser
                } else {
                    return user
                }
            })
            await fs.promises.writeFile(pathToUsers, JSON.stringify(newUsers, null, 2))
            return {
                status: "success",
                message: "user updated"
            }
        }
    }
    // Clearing user's db
    deleteAll = () => {
        if (fs.existsSync(pathToUsers)) {
            fs.unlinkSync(pathToUsers)
        }
    }
}

module.exports = UserManager
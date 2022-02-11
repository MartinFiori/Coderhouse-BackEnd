const userManager = require('./UserManager')

const manager = new userManager()

let user ={
    first_name: "asdf",
    last_name: "asdf",
    user_name: "lo de arriba es mentira",
    age: 33,
    mail: "semeescuchaoqueloque@outlook.com",
}

manager.findAllUsers().then(res=> console.table(res))

// manager.deleteById(3).then(res=>console.log(res))

// manager.findById(2).then(res=>console.log(res))

// manager.createUser(user).then(res=>console.log(res))

// manager.updateUser(2, user).then(res=>console.log(res))



// manager.deleteAll()
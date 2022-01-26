const userManager = require('./UserManager')

const manager = new userManager()

let user ={
    first_name: "Fantasma",
    last_name: "Patriarcado",
    user_name: "lo de arriba es mentira",
    age: 23,
    mail: "semeescuchaoqueloque@outlook.com"
}

// manager.findAllUsers().then(res=> console.log(res))

// manager.deleteById(3).then(res=>console.log(res))

// manager.findById(2).then(res=>console.log(res))

// manager.createUser(user).then(res=>console.log(res))

manager.deleteAll()
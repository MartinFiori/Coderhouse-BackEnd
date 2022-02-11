const fs = require('fs');

const petsPath = __dirname + './../files/pets';

class PetManager {
    add = async (pet) => {
        if (fs.existsSync(petsPath)) {
            try {
                let data = await fs.promises.readFile(petsPath, 'utf-8');
                let pets = JSON.parse(data);
                if (pets.length === 0) {
                    pet.id = 1;
                    pets.push(pet);
                    await fs.promises.writeFile(petsPath, JSON.stringify(pets, null, 2));
                    return {
                        status: "success",
                        message: 'First pet added'
                    };
                }
                pet.id = pets[pets.length - 1].id + 1;
                pets.push(pet);
                await fs.promises.writeFile(petsPath, JSON.stringify(pets, null, 2));
                return {
                    status: "success",
                    message: '1 pet added'
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        } else {
            try {
                pet.id = 1;
                await fs.promises.writeFile(petsPath, JSON.stringify([pet], null, 2));
                return {
                    status: 'success',
                    message: 'First pet created'
                };
            } catch (error) {
                return {
                    status: 'error',
                    error: error
                };
            }
        }
    }
    get = async () => {
        if (fs.existsSync(petsPath)) {
            try {
                let data = await fs.promises.readFile(petsPath, 'utf-8');
                let pets = JSON.parse(data);
                return {
                    status: 'success',
                    payload: pets
                }
            } catch (error) {
                return {
                    status: 'error',
                    error: error
                }
            }
        } else {
            return {
                status: 'success',
                payload: []
            }
        }
    }
}

module.exports = PetManager;
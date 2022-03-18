const database = require('../db.js');

class ChampManager {
    getAllChamps = async () => {
        let tableExists = await database.schema.hasTable('champs');
        if (tableExists) {
            let products = await database.from('champs').select('*');
            return {
                status: "success",
                payload: products
            };
        }
        return {
            status: "succes",
            msg: "Table created!"
        }
    }
    addChamp = async (champ) => {
        let tableExists = await database.schema.hasTable('champs');
        if (tableExists) {
            try {
                await database('champs').insert(champ)
                return{
                    status:"success",
                    msg: "champ added!"
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
    deleteChamp = async(id)=>{
        let tableExists = await database.schema.hasTable('champs');
        if(tableExists){
            try {
                await database.from('champs').where('id',id).del()
                return{
                    status:"success",
                    msg: "champ deleted!"
                }
            } catch (error) {
                return {
                    status: "error",
                    error: error
                }
            }
        }
    }
}

module.exports = ChampManager;
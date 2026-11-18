const path = require("path");  
const fs = require("node:fs/promises");

const filePath = path.join(__dirname, "tasks.json");

class Storage{

    async read(){
        try{
            const text =  await fs.readFile(filePath,"utf-8");
            if(!text){
                return [];
            }
            return JSON.parse(text);
        }
        catch(error){
            if(error.code === "ENOENT"){
                return [];
            } 
            throw error;
        }
    
 }
    async write(list){
        const text = JSON.stringify(list, null, 2);
        await fs.writeFile(filePath, text);
    }
}

module.exports = { Storage };
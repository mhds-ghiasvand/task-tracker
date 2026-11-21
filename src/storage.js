const path = require("path");  
const fs = require("node:fs/promises");



class Storage{
    constructor(filePath = path.join(__dirname, "tasks.json")){
        this.filePath = filePath;
    }
    async read(){
        try{
            const text =  await fs.readFile(this.filePath,"utf-8");
            if(!text){
                return [];
            }
            const data = JSON.parse(text);
            if (!Array.isArray(data)){
                throw new Error("Invalid tasks data");
            }
            return data;
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
        await fs.writeFile(this.filePath, text);
        return "file updated:)"

    }
}

module.exports = { Storage };
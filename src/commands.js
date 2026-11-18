class Task{
    id;
    title;
    status;

    constructor(title,status){
        // this.id = id;
        this.title = title;
        this.status = status;
    }
     async add(){
        this.title = await rl.question("task:");
        this.status = await rl.question("status:");
        
        return {"title":this.title, "status":this.status};
        
}
   
    async edit(){ 

}
    delete(){
        rl.question("choose ")
}
    show(){

}

}

module.exports = { Task };
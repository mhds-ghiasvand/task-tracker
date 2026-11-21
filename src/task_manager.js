class TaskList{

    add(title,tasks){
        const ids = tasks.map(task => task.id)
        const maxId = ids.length === 0 ? 0 : Math.max(...ids)
        return{
            "id" : maxId + 1,
            "title" : title
            }    
    }

    edit(id,newTitle,tasks){ 
        const exists = tasks.some(task => task.id === id)
        if(!exists){
            return null
        }
            return tasks.map(task =>{
            if(task.id === id){
                return{
                    ...task,
                    "title": newTitle
                }
            }
            return task
        })
    }

    delete(id,tasks){
        return tasks
            .filter(task => task.id !== id)       
    }

    showAll(tasks){
        return tasks
        .map(task => {
            return `${task.id} : ${task.title}`
        }).join("\n")
       
    }
}

module.exports = { TaskList };
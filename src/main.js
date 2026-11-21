const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const rl = readline.createInterface({
  input:stdin,
  output: stdout
});

const { TaskList } = require("./task_manager");
const { Storage } = require("./storage");

const task = new TaskList();
const save = new Storage();

let cacheList;

async function showMenu(rl){
  
  console.log("1.Add new task");
  console.log("2.Edit title");
  console.log("3.Delete task");
  console.log("4.Show all tasks");
  console.log("5.Exit");
 

  const commandNumber = await rl.question("Choose a number : ");

  return commandNumber;
}

async function menuHandler(){
  const commandNum = Number(await showMenu(rl));

  if (!Number.isInteger(commandNum)){
    return "You should enter number."
  } 
  if (commandNum < 1 || commandNum > 5){
    return "There isn't a command with this number."
  }
  if (commandNum === 5){
  return "Goodbye!";
  }

  const menuActions ={
    1:addHandler,
    2:editHandler,
    3:deleteHandler,
    4:showHandler
  }
  const action = menuActions[commandNum];
  return action(cacheList);
}

async function addHandler(tasks){
  const title = await rl.question("Title : ")
  if(!title.trim()){
    return "Title cannot be empty!";
  }
  
  cacheList.push(task.add(title,tasks))
  return save.write(cacheList)
}

async function editHandler(tasks){
  const id = Number(await rl.question("id : "))
  const newTitle = await rl.question("Title : ")
  if(!newTitle.trim()){
    return "Title cannot be empty!";
}

  const updatedTasks = task.edit(id,newTitle,tasks)
  if(updatedTasks === null){
    return "Task not found!";
  }
  cacheList = updatedTasks;
  return save.write(cacheList)
}

async function deleteHandler(tasks){
  const id = Number(await rl.question("Enter id : "))

  cacheList = task.delete(id,tasks)

  return save.write(cacheList)
}

function showHandler(tasks){
  return task.showAll(tasks);
}

async function main(){
  try {
    let result;
    do{
      cacheList = await save.read();
      result = await menuHandler();
      console.log(result);
    }while(result !== "Goodbye!")
  }
  catch(error){
    console.error("Error:", error.message);
  }
  finally {
    rl.close();
  }
}

main();

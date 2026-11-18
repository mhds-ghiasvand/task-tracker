const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const rl = readline.createInterface({
  input:stdin,
  output: stdout
});

const { Task } = require("./commands");
const { Storage } = require("./storage");

const task = new Task();
const save = new Storage();


async function showMenu(rl){
  console.log("1.Add task");
  console.log("2.Edit task");
  console.log("3.Delete task");
  console.log("4.Show list");
  console.log("5.Exit");

  const commandNumber = await rl.question("Choose a number : ");

  return commandNumber;
}

async function commandHandler(){
  const commandNum = Number(await showMenu(rl));

  if (!Number.isInteger(commandNum)){
    return "You should enter number."
  } 
  if (commandNum < 1 || commandNum > 5){
    return "There isn't a command with this number."
  }

  const menuActions ={
    1:task.add,
    2:task.edit,
    3:task.delete,
    4:task.show
  }
  const action = menuActions[commandNum];
  action();
}

async function main(){
  
  do{
    const cacheList = await Storage.read();
    await showMenu();
    await commandHandler();
  }
  while(showMenu.commandNum === 5)
  
  rl.close();
}


main();

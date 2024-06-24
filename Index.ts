#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { toTitleCase } from "./TitleCase.js";

console.clear();
console.log(chalk.red(`-------------------------------------`));
console.log(chalk.bold.green(`Welcome to Adventure Game CLI Project`));
console.log(chalk.yellow(`-------------------------------------`));
// my player class start
class Player {
  name: string;
  fuel: number = 100;

  constructor(myPlayerName: string) {
    this.name = myPlayerName;
  }

  fuelDecrease() {
    this.fuel = this.fuel - 25;
  }

  fuelIncrease() {
    this.fuel = this.fuel + 25;
  }
}
// my player class end

//   opponent class start
class Opponent {
  name: string;
  fuel: number = 100;

  constructor(opponentName: string) {
    this.name = opponentName;
  }
  fuelDecrease() {
    this.fuel = this.fuel - 25;
  }
}
//   opponent class end

// ask user name and oppnent name
let userInput = await inquirer.prompt([
  {
    type: "input",
    name: "myName",
    message: "Enter your Name:",
  },
  {
    type: "list",
    name: "opponentName",
    message: "Select your Opponent",
    choices: ["Skeleton", "Alien", "Zombie"],
  },
]);

let { myName, opponentName } = userInput;
console.log(`${chalk.bold.green(toTitleCase(myName.trim()))} VS ${chalk.bold.red(toTitleCase(opponentName))}`);

// now make objects from the classes created above:

let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);

// while loop start
let myLoop = true;
while (myLoop) {
  let startMatch = await inquirer.prompt({
    type: 'list',
    name: 'options',
    message:'Select Your Option!',
    choices:['Attack','Increase Health','Run for Life..']
  })

  let {options} = startMatch

  // conditions
  if (options === 'Attack') attackFun()
  if (options === 'Increase Health') increaseHealthFun()
  if (options === 'Run for Life..') runForLifeFun()

  // attachFun starts
  function attackFun(){
    // generate random number 0 and 1

    let number = Math.floor(Math.random()*2)

    // when random number is equal to 0, decrease the fuel of my Player!
    if(number === 0){
      myPlayer.fuelDecrease()
      console.log(`${toTitleCase(myPlayer.name)}'s fuel is ${chalk.bold.red(myPlayer.fuel)}`)
      console.log(`${myOpponent.fuel}'s fuel is ${chalk.bold.green(myOpponent.fuel)}\n`)
      
      if(myPlayer.fuel === 0){
        console.log(`${chalk.bold.red(toTitleCase(myPlayer.name))} lost! Better Luck Next Time.\n`)
        process.exit();
      }
    }
    // when random number is equal to 1, decrease the fuel of Opponent!
    if(number === 1){
      myOpponent.fuelDecrease()
      console.log(`${toTitleCase(myPlayer.name)}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`)
      console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`)

      if(myOpponent.fuel === 0){
        console.log(`Congratulations ${chalk.bold.green(toTitleCase(myPlayer.name))}! You won the Game.\n`)
        process.exit();
      }
    }
  }

  // increase Health Start
  function increaseHealthFun(){
    myPlayer.fuelIncrease()
    console.log(`${toTitleCase(myPlayer.name)}'s fuel is increased to ${chalk.bold.green(myPlayer.fuel)}`)
  }
  // increase Health End
  function runForLifeFun(){
    console.log(`${chalk.bold.red(toTitleCase(myPlayer.name))} Lost! Better luck Next Time.`)
    process.exit();
  }
  // attachFun Ends
}
// while loop ends
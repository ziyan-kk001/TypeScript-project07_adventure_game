#! /usr/bin/env node
import inquirer from "inquirer";
let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // Percentange
let playerLevel = 1;
let running = true;
let getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max - min) + min;
};
console.log("\n\tWelcome to the Dungeon!");
GAME: while (running) {
    console.log("\t-----------------------------------");
    let enemyHealth = getRandomNumber(1, maxEnemyHealth);
    let enemy = enemies[getRandomNumber(0, enemies.length - 1)];
    console.log(`\t# ${enemy} has appeared #\n`);
    while (enemyHealth > 0) {
        console.log(`\n\t# Your HP: ${health} #`);
        console.log(`\t# ${enemy} HP: ${enemyHealth} #`);
        let control = await inquirer.prompt({
            message: "\n\tWhat would you like to do?",
            type: "list",
            choices: ["\tAttack", "\tDrink Health Potion", "\tRun"],
            name: "command"
        });
        switch (control.command) {
            case "\tAttack":
                let strikeDamage = getRandomNumber(1, attackDamage);
                let damageTaken = getRandomNumber(1, enemyAttackDamage);
                health -= damageTaken;
                enemyHealth -= strikeDamage;
                console.log(`\tYou Strike the ${enemy} with ${strikeDamage} damage.`);
                console.log(`\tYou received ${damageTaken} damage from the enemy`);
                if (health < 1) {
                    console.log(`\tYou've taken too much damage. You are too weak to go on.`);
                    break;
                }
                break;
            case "\tDrink Health Potion":
                if (numHealthPotions > 0) {
                    health += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log(`\tYou drank health potion, healing yourself for ${healthPotionHealAmount}\n\tYou now have ${health} HP\n\tYou now have ${numHealthPotions} health potion(s) left.`);
                }
                else {
                    console.log(`\tYou have no health potions left, defeat enemies for a chance to get one.`);
                }
                break;
            case "\tRun":
                console.log(`\tYou ran away from the ${enemy}.`);
                continue GAME;
                break;
        }
    }
    if (health < 1) {
        console.log(`\tYou limp out of the dungeon, weak from battle.`);
        break;
    }
    console.log("\t-----------------------------------");
    console.log(`\t# ${enemy} has been defeated #`);
    console.log(`\t# You have ${health} HP left #`);
    playerLevel++;
    console.log(`\t# Your level is now Level #${playerLevel} #`);
    if (getRandomNumber(1, 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`\t# The ${enemy} dropped a health potion #`);
        console.log(`\t# You now have ${numHealthPotions} health potion(s). #`);
    }
    let stateControl = await inquirer.prompt({
        message: "\n\tWhat would you like to do?",
        type: "list",
        choices: ["\tContinue Fighting", "\tExit Dungeon"],
        name: "command"
    });
    if (stateControl.command == "\tContinue Fighting") {
        console.log(`\n\tYour adventure continues!`);
    }
    else {
        console.log(`\n\tYou exit the dungeon, successful from your adventures.`);
        break;
    }
}
console.log(`\n\t#####################`);
console.log(`\tTHANK YOU FOR PLAYING`);
console.log(`\t#####################`);
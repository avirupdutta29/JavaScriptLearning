let xp=0;
let health=100;
let gold=50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory= ["stick"];

let el = document.querySelector("#el");

const  button1 = document.querySelector("#button1");
const  button2 = document.querySelector("#button2");
const  button3 = document.querySelector("#button3");
const  text = document.querySelector("#text");
const  xpText = document.querySelector("#xptext");
const  healthText = document.querySelector("#healthText");
const  goldText = document.querySelector("#goldText");
const  monsterStats = document.querySelector("#monsterStats");
const  monsterHealthText = document.querySelector("#monsterHealth");
const  monsterNameText = document.querySelector("#monsterName");

const weapons = [
    {
        name:"stick",
        power:5
    },
    {
        name:"dagger",
        power:30
    },
    {
        name:"claw hammer",
        power:50
    },
    {
        name:"sword",
        power:100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];


const locations = [
    {
        name: "Town Sqare",
        "button text":["Go To Store","Go To Cave","Fight Dragon"],
        "button functions":[goStore,goCave,fightDragon],
        text:"You are in the Time Square. You see a sign that says \"store\". *"
    },
    {
        name:"Store",
        "button text":["Buy 10 Health with (10 Gold)","Buy Weapon with (30 Gold)","Go To Town Square"],
        "button functions":[buyHealth, buyWeapon, goTown],
        text:"You entered the store"
    },
    {
        name:"Cave",
        "button text":["Fight Slime","Fight fanged Beast","Go To Town Square"],
        "button functions":[fightSlime, fightBeast, goTown],
        text:"You entered the cave. You see some monsters"
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button functions":[attack, dodge, goTown],
        text:"You are fighting a monster"
    },
    {
        name:"kill monsters",
        "button text":["Go to Town Square","Go to Town Square","Go to Town Square"],
        "button functions":[goTown, goTown, goTown],
        text:'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name:"fight",
        "button text":["Attack","Dodge","Run"],
        "button functions":[attack, dodge, goTown],
        text:"You are fighting a monster"
    },
    {
        name:"lose",
        "button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button functions":[restart, restart, restart],
        text:"You die"
    },
    {
        name:"win",
        "button text":["REPLAY?","REPLAY?","REPLAY?"],
        "button functions":[restart, restart, restart],
        text:"You die"
    },
];

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=fightDragon;

function update(locations){

    monsterStats.style.display = "none";
    button1.innerText=locations["button text"][0];
    button2.innerText=locations["button text"][1];
    button3.innerText=locations["button text"][2];
    button1.onclick=locations["button functions"][0];
    button2.onclick=locations["button functions"][1];
    button3.onclick=locations["button functions"][2];
    text.innerText=locations.text;

}

function goTown(){

    update(locations[0]);
}


function goStore(){
   
    update(locations[1]);
}

function goCave(){

    update(locations[2]);

}


function buyHealth(){

    if(gold >=10){
        gold-= 10;
        health+= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You donot have enough gold to buy health";
    }
}

function buyWeapon(){
    if(currentWeapon< weapons.length-1){
        if(gold>=30){
            gold-=30;
            currentWeapon +=1;
            goldText.innerText = gold;
            let newWeapons = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapons+ ".";
            inventory.push(newWeapons);
            text.innerText = "In your inventory you have " + inventory+ ".";
    }
    else{
        text.innerText = "You donot have enough gold coins to buy weapons";
    }
 }
 else{
    text.innerText = "You already have the most powerful weapon";
    button2.innerText="Sell weapons for 15 coins";
    button2.onclick=sellWeapon;
  }

}

function sellWeapon(){
    if(inventory.length>1){
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a "+ currentWeapon+".";
    }
    else{
        text.innerText = "Don't sell you only weapon";
    }
}

function fightSlime(){
    fighting=0;
    goFight();
}

function fightBeast(){
    fighting=1;
    goFight();
}

function fightDragon(){
    fighting=2;
    goFight();  
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    alert( monsters[fighting].name);
    monsterNameText.innerText = monsters[fighting].name;
    alert(monsterHealth);
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks";
    text.innerText += " You attack is with your " + weapons[currentWeapon].name;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
       fighting===2 ? winGame():defeatMonster();
    }
}

function dodge(){
    text.innerText = "You dodged attacks from the " + monsters[fighting].name + ".";
}


function defeatMonster(){

    gold += Math.floor(monsters[fighting].level *6.7);
    xp+=monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]); 
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){

    let xp=0;
    let health=100;
    let gold=50;
    let currentWeapon = 0;
    let fighting;
    let monsterHealth;
    let inventory= ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}
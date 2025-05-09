import { prompt } from "./prompt.js";

class Pokemon {
  constructor(name, type, health, attacks) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.maxHealth = health;
    this.attacks = attacks;
  }

  // choisit une attaque aléatoirement et retourne l'attaque choisie.
  randomAttack() {
    const random = Math.floor(Math.random() * 3);

    return this.attacks[random];
  }

  // affiche dans la console la liste des attaques avec 1 2 3 et le nom de l'attaque.
  logAttack() {
    let attackList = "";
    for (let i = 0; i < this.attacks.length; i++) {
      attackList += `${i} - ${this.attacks[i].name} \n`;
    }

    return attackList;
  }

  // affiche le pokemon avec son nom, sa vie, ses attaques.
  logPokemon() {
    const attacksPokemon = this.logAttack();

    console.log(
      `\n${this.name} a ${this.health} PV. 
Il est de type : ${this.type}.  
Ces attaques sont : 
${attacksPokemon}`
    );
  }

  // retourne la vie du pokemon avec des 🟥 pour chaque 10% de PV perdu et des 🟩 pour chaque 10% de PV restant.
  getHealth() {
    let pv = "";
    const healthPercentage = this.health / this.maxHealth;

    const greenBars = Math.round(healthPercentage * 10);
    const redBars = 10 - greenBars;
    pv = "🟩".repeat(greenBars) + "🟥".repeat(redBars);
    return pv;
  }
}

class Attack {
  constructor(name, power, stability) {
    this.name = name;
    this.power = power;
    this.stability = stability;
  }
  //calcule le nombre de damage en fonction de la stabilité et du power de l'attaque. Il retourne le nombre de damage.
  performAttack() {
    let damage = 0;

    damage = Math.floor(Math.random() * this.power) * this.stability;

    return damage;
  }
  //fonction pour afficher l'attaque avec les différentes propriétés
  logAttack() {
    console.log(`Le nom de l'attaque est ${this.name} 
      elle a une puissance de ${this.power} et une stabilité de ${this.stability}`);
  }
}

class Game {
  constructor(parameters) {}
}

const pikachu = new Pokemon("Pikachu", "⚡️", 100, [
  new Attack("Tonnerre", 30, 0.2),
  new Attack("Fatal-Foudre", 20, 0.4),
  new Attack("Eclair", 10, 0.8),
]);

const bulbizarre = new Pokemon("Bulbizarre", "🍃", 110, [
  new Attack("Fouet Lianes", 25, 0.3),
  new Attack("Tranch'Herbe", 20, 0.5),
  new Attack("Poudre Toxik", 10, 0.8),
]);

const salameche = new Pokemon("Salamèche", "🔥", 90, [
  new Attack("Flammèche", 35, 0.2),
  new Attack("Griffe", 25, 0.3),
  new Attack("Crocs Feu", 15, 0.75),
]);

pikachu.logPokemon();

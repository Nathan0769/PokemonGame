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
    this.attacks.forEach((attaque, index) => {
      attackList += `${index + 1} - ${attaque.logAttack()}\n`;
    });

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

  get isInLive() {
    if (this.health <= 0) {
      return false;
    }
    return true;
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

    damage = Math.floor(Math.random() * this.power * this.stability);

    return damage;
  }
  //fonction pour afficher l'attaque avec les différentes propriétés
  logAttack() {
    return `${this.name} | puissance : ${this.power} | stabilité : ${this.stability}`;
  }
}

// Créez un tableau pour stocker les Pokémon
const pokemons = [
  new Pokemon("Pikachu", "⚡️", 100, [
    new Attack("Tonnerre    ", 30, 0.2),
    new Attack("Fatal-Foudre", 20, 0.4),
    new Attack("Eclair      ", 10, 0.8),
  ]),
  new Pokemon("Bulbizarre", "🍃", 110, [
    new Attack("Fouet Lianes", 25, 0.3),
    new Attack("Tranch'Herbe", 20, 0.5),
    new Attack("Poudre Toxik", 10, 0.8),
  ]),
  new Pokemon("Salamèche", "🔥", 90, [
    new Attack("Flammèche", 35, 0.2),
    new Attack("Griffe   ", 25, 0.3),
    new Attack("Crocs Feu", 15, 0.75),
  ]),
];

class Game {
  constructor() {}

  start() {
    let combatContinue = true;
    const choixPokemon = this.choixPokemon;
    const pokemonAdverse = this.pokemonOpposing(choixPokemon);

    while (combatContinue) {
      this.combat(choixPokemon, pokemonAdverse);
      const attaqueUser = this.choixAttack(choixPokemon);
      const attaqueAdverse = this.attacksOpponent(pokemonAdverse);

      this.damagePokemon(
        choixPokemon,
        pokemonAdverse,
        attaqueUser,
        attaqueAdverse
      );

      if (
        pokemons[choixPokemon].isInLive &&
        pokemons[pokemonAdverse].isInLive
      ) {
        combatContinue = true;
      } else {
        combatContinue = false;
      }
    }

    console.log(
      `\n${
        pokemonAdverse.isInLive
          ? pokemons[choixPokemon].name
          : pokemons[pokemonAdverse].name
      } n'a plus de santé. ${
        pokemonAdverse.isInLive
          ? pokemons[pokemonAdverse].name
          : pokemons[choixPokemon].name
      } remporte la bataille !`
    );
  }

  get choixPokemon() {
    return (
      Number(
        prompt(
          `Choisissez votre pokémon : \n${pokemons
            .map((pokemon, index) => `${index + 1} - ${pokemon.name}`)
            .join("\n")}\nChoix : `
        )
      ) - 1
    );
  }

  // Le script génère un nombre aléatoire entre 1 et 2 qui représente le pokemon adverse
  pokemonOpposing(choixPokemon) {
    const index = Math.floor(Math.random() * pokemons.length);

    if (index === choixPokemon) {
      return this.pokemonOpposing(choixPokemon);
    }
    return index;
  }

  combat(choixPokemon, pokemonAdverse) {
    console.log(`\nCombat : 

      ${pokemons[choixPokemon].name} ${pokemons[choixPokemon].type} 
      pv : ${pokemons[choixPokemon].getHealth()}  ${
      pokemons[choixPokemon].health
    }
      
      ⚡️ VS ⚡️
      
      ${pokemons[pokemonAdverse].name} ${pokemons[pokemonAdverse].type}
      pv : ${pokemons[pokemonAdverse].getHealth()}  ${
      pokemons[pokemonAdverse].health
    }\n`);
  }

  //Le script demande au player de choisir une attaque
  choixAttack(choixPokemon) {
    console.log(pokemons[choixPokemon].logAttack(), "\n");
    const attaque = prompt("Choix de l'attaque : ");
    if (attaque !== "1" && attaque !== "2" && attaque !== "3") {
      return this.choixAttack(choixPokemon);
    }
    return pokemons[choixPokemon].attacks[Number(attaque) - 1];
  }

  attacksOpponent(pokemonAdverse) {
    return pokemons[pokemonAdverse].attacks[
      Math.floor(Math.random() * pokemons[pokemonAdverse].attacks.length)
    ];
  }

  //Le script affiche le nombre de damage pour chaque pokemon
  damagePokemon(pokemonUser, pokemonAdverse, attaqueUser, attaqueAdverse) {
    const damageUser = attaqueUser.performAttack();

    const damageAdverse = attaqueAdverse.performAttack();

    pokemons[pokemonAdverse].health -= damageUser;
    pokemons[pokemonUser].health -= damageAdverse;

    return console.log(
      `\n💥 ${pokemons[pokemonUser].name} utilise ${attaqueUser.name} infligeant ${damageUser} dommage et ${pokemons[pokemonAdverse].name} adverse utilise ${attaqueAdverse.name} infligeant ${damageAdverse} dommage.`
    );
  }
}

const game = new Game();
game.start();

# Pokémon Battle Game ⚔️

Ce projet implémente un jeu de combat entre Pokémon en utilisant JavaScript. Le joueur choisit un Pokémon et combat contre un Pokémon adverse choisi aléatoirement. Chaque Pokémon a trois attaques avec des puissances et des stabilités variées, et les combats sont déterminés par des choix d'attaques et des calculs de dommages.

## 🛠️ Techniques utilisées

- **Classes ES6** : Utilisation des classes `Pokemon`, `Attack` et `Game` pour structurer le jeu et modéliser les entités du jeu.
- **Méthodes de classes** : Chaque classe possède des méthodes permettant de calculer des éléments du jeu, comme l'attaque aléatoire (`randomAttack`), l'affichage des informations sur les Pokémon et les attaques, et les calculs de dégâts.
- **Math.random()** : Utilisé pour générer des valeurs aléatoires, par exemple pour choisir un Pokémon adverse et pour calculer les dégâts des attaques.
- **Manipulation de chaînes** : Création de chaînes dynamiques pour afficher la santé des Pokémon avec des barres vertes et rouges (🟩🟥).
- **Fonctions récursives** : Utilisation de la récursivité dans la fonction `pokemonOpposing` pour s'assurer que le joueur et l'adversaire ne combattent pas le même Pokémon.

## 📚 Bibliothèques et technologies utilisées

- **prompt-sync** : Utilisé pour permettre au joueur de faire des choix via la console en ligne de commande (commande `prompt`).

## 📂 Structure du projet

- **/root**
  - **/node_modules** : Dossier pour les dépendances npm (ex. `prompt-sync`)
  - **prompt.js** : Fichier qui contient la fonction `prompt` utilisée dans le jeu
  - **index.js** : Le fichier principal du jeu qui contient les classes Pokémon, Attack, et Game

### 📝 Détails des fichiers

- **prompt.js** : Ce fichier contient la définition de la fonction `prompt`, qui permet de recueillir les choix de l'utilisateur via la console. Elle est utilisée dans plusieurs parties du jeu, comme dans la sélection du Pokémon et de l'attaque.
- **index.js** : Le cœur du jeu, où les classes `Pokemon`, `Attack` et `Game` sont définies. Ce fichier contient toute la logique du combat, de l'initialisation du jeu à l'affichage du gagnant.

## 🛠️ Technologies utilisées

- JavaScript
- Node.js

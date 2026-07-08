// Bienvenue sur ma station météo 🌦️

console.log("Station météo chargée !");

async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    console.log(texte);

}

chargerDonnees();

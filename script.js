async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");

    const texte = await reponse.text();

    document.getElementById("csv").textContent = texte;

}

chargerDonnees();

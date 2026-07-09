async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    // Titres personnalisés
    const titres = [
        "📅 Date",
        "🕒 Heure",
        "📈 Pression",
        "🌡️ Température",
        "💧 Humidité",
        "🌫️ Point de rosée",
        "🔥 Indice de chaleur",
        "🌬️ Vent moyen",
        "💨 Rafale",
        "🥶 Refroidissement éolien"
    ];

    // Unités (4e ligne du fichier Bresser)
    const unites = lignes[3].split(";");

    let html = "<table>";

    // Ligne des titres
    html += "<tr>";

    for (let i = 0; i < titres.length; i++) {

        let titre = titres[i];

        if (unites[i]) {
            titre += `<br><small>${unites[i]}</small>`;
        }

        html += `<th>${titre}</th>`;
    }

    html += "</tr>";

    // Les données commencent après les 4 lignes d'en-tête
    for (let i = 4; i < lignes.length; i++) {

        const colonnes = lignes[i].split(";");

        if (colonnes.length < titres.length) continue;

        html += "<tr>";

        for (let j = 0; j < titres.length; j++) {
            html += `<td>${colonnes[j]}</td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

}

chargerDonnees();

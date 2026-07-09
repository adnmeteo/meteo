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

    // Unités (3e ligne du fichier)
    const unites = lignes[2].split(";");

    let html = "<table>";

    // Première ligne : les titres
    html += "<tr>";

    for (let i = 0; i < titres.length; i++) {

        let titre = titres[i];

        if (unites[i]) {
            titre += "<br><small>" + unites[i] + "</small>";
        }

        html += `<th>${titre}</th>`;
    }

    html += "</tr>";

    // Les données commencent à la 4e ligne
    for (let i = 3; i < lignes.length; i++) {

        const colonnes = lignes[i].split(";");

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

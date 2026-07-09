async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    // Les colonnes que NOUS décidons d'afficher
    const titres = [
        { nom: "📅 Date", unite: "" },
        { nom: "🕒 Heure", unite: "" },
        { nom: "📈 Pression", unite: "hPa" },
        { nom: "🌡️ Température", unite: "°C" },
        { nom: "💧 Humidité", unite: "%" },
        { nom: "🌫️ Point de rosée", unite: "°C" },
        { nom: "🔥 Indice de chaleur", unite: "°C" },
        { nom: "🌬️ Vent moyen", unite: "km/h" },
        { nom: "💨 Rafale", unite: "km/h" },
        { nom: "🥶 Refroidissement éolien", unite: "°C" }
    ];

    let html = "<table>";

    // Ligne d'en-tête
    html += "<tr>";

    titres.forEach(colonne => {

        html += `
        <th>
            ${colonne.nom}
            ${colonne.unite ? `<br><small>${colonne.unite}</small>` : ""}
        </th>`;

    });

    html += "</tr>";

    // Les données commencent à la 5e ligne du fichier Bresser
    for (let i = 4; i < lignes.length; i++) {

        const colonnes = lignes[i].split(";");

        if (colonnes.length < 10) continue;

        html += "<tr>";

        for (let j = 0; j < 10; j++) {

            html += `<td>${colonnes[j]}</td>`;

        }

        html += "</tr>";

    }

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

}

chargerDonnees();

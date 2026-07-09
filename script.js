// ==========================================
// ADN MÉTÉO
// Lecture du fichier latest.csv
// ==========================================

async function chargerDonnees() {

    // Lecture du fichier CSV
    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    // Découpage ligne par ligne
    const lignes = texte.trim().split("\n");

    // Vérifie qu'il existe des données
    if (lignes.length < 5) {
        console.log("Pas assez de données.");
        return;
    }

    // ==========================================
    // DERNIÈRE OBSERVATION
    // ==========================================

    const derniere = lignes[lignes.length - 1].split(";");
    document.getElementById("maj").textContent =
"🕒 Dernière observation : " +
derniere[0] + " à " + derniere[1];
    document.getElementById("temp").textContent = derniere[3] + " °C";
    document.getElementById("hum").textContent = derniere[4] + " %";
    document.getElementById("pres").textContent = derniere[2] + " hPa";

    // ==========================================
    // TABLEAU
    // ==========================================

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

    const unites = [
        "",
        "",
        "hPa",
        "°C",
        "%",
        "°C",
        "°C",
        "km/h",
        "km/h",
        "°C"
    ];

    let html = "<table>";

    html += "<tr>";

    for (let i = 0; i < titres.length; i++) {

        html += `
        <th>
            ${titres[i]}
            ${unites[i] ? `<br><small>${unites[i]}</small>` : ""}
        </th>`;

    }

    html += "</tr>";

    // Les données commencent après les 4 lignes d'en-tête Bresser

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

    // =========================
// Données du graphique
// =========================

const heures = [];
const temperatures = [];

for (let i = 4; i < lignes.length; i++) {

    const colonnes = lignes[i].split(";");

    heures.push(colonnes[1]);
    temperatures.push(parseFloat(colonnes[3]));

}
    document.getElementById("tableau").innerHTML = html;

}

chargerDonnees();

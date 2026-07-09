// ==========================================
// RELEVÉS MÉTÉO - BRESSER 5-EN-1
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

    // ==========================================
    // DONNÉES
    // ==========================================

    const heures = [];
    const temperatures = [];

    for (let i = lignes.length - 1; i >= 4; i--) {
        
        const colonnes = lignes[i].split(";");

        if (colonnes.length < titres.length) continue;

        heures.push(colonnes[1]);
        temperatures.push(parseFloat(colonnes[3]));

        html += "<tr>";

        for (let j = 0; j < titres.length; j++) {

            html += `<td>${colonnes[j]}</td>`;

        }

        html += "</tr>";

    }

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

    // ==========================================
    // GRAPHIQUE TEMPÉRATURE
    // ==========================================

    new Chart(document.getElementById("graphTemp"), {

        type: "line",

        data: {

            labels: heures,

            datasets: [{

                label: "Température (°C)",

                data: temperatures,

                borderColor: "#4fc3f7",

                backgroundColor: "rgba(79,195,247,0.2)",

                borderWidth: 2,

                fill: true,

                pointRadius: 0,

                tension: 0.3

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "white"

                    }

                },

                y: {

                    ticks: {

                        color: "white"

                    }

                }

            }

        }

    });

}

chargerDonnees();

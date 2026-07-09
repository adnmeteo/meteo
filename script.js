// ==========================================
// RELEVÉS MÉTÉO - BRESSER 5-EN-1
// Lecture du fichier latest.csv
// ==========================================

async function chargerDonnees() {

    // Lecture du fichier CSV
    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

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

    let html = "<table><tr>";

    for (let i = 0; i < titres.length; i++) {

        html += `<th>${titres[i]}${unites[i] ? `<br><small>${unites[i]}</small>` : ""}</th>`;

    }

    html += "</tr>";

    // ==========================================
    // DONNÉES
    // ==========================================

    const heures = [];
    const temperatures = [];
    const humidites = [];
    const pressions = [];
    const pointRosee = [];
    const indiceChaleur = [];

    for (let i = lignes.length - 1; i >= 4; i--) {

        const colonnes = lignes[i].split(";");

        if (colonnes.length < titres.length) continue;

        heures.push(colonnes[1]);
        pressions.push(parseFloat(colonnes[2]));
        temperatures.push(parseFloat(colonnes[3]));
        humidites.push(parseFloat(colonnes[4]));
        pointRosee.push(parseFloat(colonnes[5]));
        indiceChaleur.push(parseFloat(colonnes[6]));

        html += "<tr>";

        for (let j = 0; j < titres.length; j++) {

            html += `<td>${colonnes[j]}</td>`;

        }

        html += "</tr>";

    }

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

    // ==========================================
    // LISTE DES VARIABLES
    // ==========================================

    const variables = {

        temperature: {
            label: "🌡️ Température (°C)",
            data: temperatures,
            couleur: "#4fc3f7"
        },

        humidite: {
            label: "💧 Humidité (%)",
            data: humidites,
            couleur: "#64ffda"
        },

        pression: {
            label: "📈 Pression (hPa)",
            data: pressions,
            couleur: "#ffd54f"
        },

        rosee: {
            label: "🌫️ Point de rosée (°C)",
            data: pointRosee,
            couleur: "#ba68c8"
        },

        chaleur: {
            label: "🔥 Indice de chaleur (°C)",
            data: indiceChaleur,
            couleur: "#ff7043"
        }

    };

    // ==========================================
    // GRAPHIQUE
    // ==========================================

    const ctx = document.getElementById("graphTemp");

    const graphique = new Chart(ctx, {

        type: "line",

        data: {

            labels: heures,

            datasets: [{

                label: variables.temperature.label,

                data: variables.temperature.data,

                borderColor: variables.temperature.couleur,

                backgroundColor: variables.temperature.couleur + "33",

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

    // ==========================================
    // CHANGEMENT DE COURBE
    // ==========================================

    document.getElementById("choixGraph").addEventListener("change", function () {

        const choix = variables[this.value];

        graphique.data.datasets[0].label = choix.label;
        graphique.data.datasets[0].data = choix.data;
        graphique.data.datasets[0].borderColor = choix.couleur;
        graphique.data.datasets[0].backgroundColor = choix.couleur + "33";

        graphique.update();

    });

}

chargerDonnees();

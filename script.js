// ==========================================
// RELEVÉS MÉTÉO - BRESSER 5-EN-1
// Lecture du fichier latest.csv
// ==========================================

let graphique = null;

async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    if (lignes.length < 5) {
        console.log("Pas assez de données.");
        return;
    }

    // ==========================
    // DERNIÈRE OBSERVATION
    // ==========================

    const derniere = lignes[lignes.length - 1].split(";");

    document.getElementById("maj").textContent =
        "🕒 Dernière observation : " +
        derniere[0] + " à " + derniere[1];

    document.getElementById("temp").textContent = derniere[3] + " °C";
    document.getElementById("hum").textContent = derniere[4] + " %";
    document.getElementById("pres").textContent = derniere[2] + " hPa";

    // ==========================
    // TABLEAU
    // ==========================

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

    // ==========================
    // DONNÉES DES GRAPHIQUES
    // ==========================

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

    // ==========================
    // VARIABLES DISPONIBLES
    // ==========================

    const variables = {

        temperature: {
            titre: "🌡️ Température",
            unite: "°C",
            couleur: "#4fc3f7",
            valeurs: temperatures
        },

        humidite: {
            titre: "💧 Humidité",
            unite: "%",
            couleur: "#64ffda",
            valeurs: humidites
        },

        pression: {
            titre: "📈 Pression",
            unite: "hPa",
            couleur: "#ffd54f",
            valeurs: pressions
        },

        rosee: {
            titre: "🌫️ Point de rosée",
            unite: "°C",
            couleur: "#ba68c8",
            valeurs: pointRosee
        },

        chaleur: {
            titre: "🔥 Indice de chaleur",
            unite: "°C",
            couleur: "#ff7043",
            valeurs: indiceChaleur
        }

    };

    const ctx = document.getElementById("graphTemp");

    // ==========================================
    // CRÉATION DU GRAPHIQUE
    // ==========================================

    graphique = new Chart(ctx, {

        type: "line",

        data: {

            labels: heures,

            datasets: [{

                label: variables.temperature.titre,

                data: variables.temperature.valeurs,

                borderColor: variables.temperature.couleur,

                backgroundColor: variables.temperature.couleur + "33",

                borderWidth: 3,

                pointRadius: 0,

                tension: 0.35,

                fill: true

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                intersect: false,

                mode: "index"

            },

            plugins: {

    legend: {

        labels: {

            color: "white"

        }

    },

    zoom: {

        pan: {

            enabled: true,
            mode: "x"

        },

        zoom: {

            wheel: {

                enabled: true

            },

            pinch: {

                enabled: true

            },

            mode: "x"

        }

    }

},

scales: {
    
                x: {

                    ticks: {

                        color: "#d8d8d8"

                    },

                    grid: {

                        color: "#3d4b5a"

                    }

                },

                y: {

                    ticks: {

                        color: "#d8d8d8"

                    },

                    grid: {

                        color: "#3d4b5a"

                    }

                }

            }

        }

    });

    // ==========================================
    // BOUTONS DES GRAPHIQUES
    // ==========================================

    const boutons = document.querySelectorAll(".graph-btn");

    boutons.forEach(bouton => {

        bouton.addEventListener("click", () => {

            boutons.forEach(b => b.classList.remove("active"));

            bouton.classList.add("active");

            const choix = variables[bouton.dataset.graph];

            graphique.data.datasets[0].label =
                choix.titre + " (" + choix.unite + ")";

            graphique.data.datasets[0].data =
                choix.valeurs;

            graphique.data.datasets[0].borderColor =
                choix.couleur;

            graphique.data.datasets[0].backgroundColor =
                choix.couleur + "33";

            graphique.update();

        });

    });

}

chargerDonnees();

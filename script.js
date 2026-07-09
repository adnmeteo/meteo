async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    let html = "<table>";

    lignes.forEach((ligne, index) => {

        const colonnes = ligne.split(";");

        html += "<tr>";

        colonnes.forEach(colonne => {

            colonne = colonne.replaceAll('"', '');

            if (index === 0) {
                html += `<th>${colonne}</th>`;
            } else {
                html += `<td>${colonne}</td>`;
            }

        });

        html += "</tr>";

    });

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

}

chargerDonnees();

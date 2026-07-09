async function chargerDonnees() {

    const reponse = await fetch("data/latest.csv");
    const texte = await reponse.text();

    const lignes = texte.trim().split("\n");

    // Fusion des 3 lignes d'en-têtes du fichier Bresser
    const titres = lignes[0].split(";").map(s => s.replace(/"/g,""));
    const sousTitres = lignes[1].split(";");
    const unites = lignes[2].split(";");

    let html = "<table>";

    html += "<tr>";

    for(let i=0;i<titres.length;i++){

        let titre = titres[i];

        if(sousTitres[i])
            titre += " " + sousTitres[i];

        if(unites[i])
            titre += "<br><small>" + unites[i] + "</small>";

        html += `<th>${titre}</th>`;
    }

    html += "</tr>";

    // Les données commencent à la 4e ligne
    for(let i=3;i<lignes.length;i++){

        html += "<tr>";

        const colonnes = lignes[i].split(";");

        colonnes.forEach(colonne=>{

            html += `<td>${colonne}</td>`;

        });

        html += "</tr>";

    }

    html += "</table>";

    document.getElementById("tableau").innerHTML = html;

}

chargerDonnees();

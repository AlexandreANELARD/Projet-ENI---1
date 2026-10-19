window.onload = init

function init() {
    // Page Préférences : le bouton n'existe que sur cette page
    if (document.getElementById("enregistrer-prefs") !== null) {
        if (checkPreference()) {
            setPreference()
        } else {
            // Sinon : on remet dans le formulaire les choix enregistrés
            document.getElementById("theme").value = localStorage.getItem("theme")
            document.getElementById(localStorage.getItem("affichage")).checked = true
        }
        // Création de l'écouteur sur le bouton de la page Préférences
        document.getElementById("enregistrer-prefs").addEventListener('click', setPreference)
    }

    // Page d'accueil : le tbody n'existe que sur cette page
    if (document.getElementById("liste-apprenants") !== null) {
        // Récupération et lecture du JSON
        fetch("promo.json").then(response => response.json()).then(data => showApprenants(data.apprenants))
    }
}

function checkPreference() {
    return localStorage.getItem("theme") === null || localStorage.getItem('affichage') === null

}

function setPreference() {
    const theme = document.getElementById("theme").value
    const affichage = document.querySelector('input[name="affichage"]:checked').value

    localStorage.setItem("theme", theme)
    localStorage.setItem("affichage", affichage)
}


function showApprenants(apprenants) {
    let tabApprenants = document.getElementById("liste-apprenants")
    const infosApprenants = ["nom", "prenom", "ville"]

    for (let i = 0; i < apprenants.length; i++) {
        let tabRow = document.createElement("tr")
        tabApprenants.append(tabRow)
        for (let j = 0; j < infosApprenants.length; j++) {
            let tabData = document.createElement("td")
            tabRow.append(tabData)
            tabData.append(apprenants[i][infosApprenants[j]])
        }

        let tabDataDetail = document.createElement("td")
        let detail = document.createElement("a")
        detail.setAttribute("href", "#")
        detail.innerText = "Détails"
        tabRow.append(tabDataDetail)
        tabDataDetail.append(detail)

    }
}
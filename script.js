window.onload = init

function init() {

    // Abonnement de la page d'accueil
    if (document.getElementById("page-accueil") !== null) {
        // Récupération et lecture du JSON
        fetch("promo.json").then(response => response.json()).then(data => {
            setTable(data.apprenants)
            setCards(data.apprenants)

        })

        const affiLocalStorage = localStorage.getItem("affichage")
        changeAffichage(affiLocalStorage);

        // Ecouteur pour le changer ponctuel d'affichage
        ["list", "cards"].forEach(id => {
            document.getElementById(id).addEventListener("change", () => changeAffichage(id));
        })
    }

    // Abonnement de la page des préférences
    if (document.getElementById("page-preference") !== null) {
        if (checkPreference("both")) {
            setPreference()
        } else {
            // Sinon : on remet dans le formulaire les choix enregistrés
            document.getElementById("theme").value = localStorage.getItem("theme")
            document.getElementById(localStorage.getItem("affichage")).checked = true
        }
        // Création de l'écouteur sur le bouton de la page Préférences
        document.getElementById("enregistrer-prefs").addEventListener('click', setPreference)
    }

    // Abonnement de la page d'informations
    if (document.getElementById("page-informations")) {
        fetch("promo.json").then(response => response.json()).then(data => {
            setNbApprenants(data.apprenants)
        })
    }



    // Application du thème choisi dans les préférences
    const themeLocalStorage = localStorage.getItem("theme")
    changeTheme(themeLocalStorage)

}

function checkPreference(which) {

    if (which === "both") {
        return localStorage.getItem("theme") === null || localStorage.getItem('affichage') === null
    } else if (which === "theme") {
        return localStorage.getItem("theme") === null
    } else if (which === "affichage") {
        return localStorage.getItem('affichage') === null
    }


}

function setPreference() {
    const theme = document.getElementById("theme").value
    const affichage = document.querySelector('input[name="affichage"]:checked').value

    localStorage.setItem("theme", theme)
    localStorage.setItem("affichage", affichage)
    changeTheme(theme)
}


function setTable(apprenants) {
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
        detail.innerText = "Détail"
        tabRow.append(tabDataDetail)
        tabDataDetail.append(detail)

    }
}

function setCards(apprenants) {
    const infosApprenants = ["nom", "prenom", "ville"]
    const conteneurCartes = document.getElementById("conteneur-cards")

    for (let i = 0; i < apprenants.length; i++) {
        const carte = document.createElement("div")
        carte.setAttribute("class", "carte")
        conteneurCartes.append(carte)

        for (let j = 0; j < infosApprenants.length; j++) {
            const info = document.createElement("p")
            info.append(apprenants[i][infosApprenants[j]])
            carte.append(info)
        }

        const detail = document.createElement("a")
        detail.setAttribute("href", "#")
        detail.innerText = "Détail"
        carte.append(detail)
    }
}

function changeAffichage(mode) {
    const tableau = document.getElementById("conteneur-tableau")
    const cards = document.getElementById("conteneur-cards")

    if (mode === "cards") {
        document.getElementById(mode).checked = true
        tableau.style.display = "none"
        cards.style.display = ""
    } else if (mode === "list") {
        document.getElementById(mode).checked = true
        tableau.style.display = ""
        cards.style.display = "none"
    } else if (mode === null) {
        localStorage.setItem("affichage", "list")
        document.getElementById("list").checked = true
        tableau.style.display = ""
        cards.style.display = "none"
    }
}

function changeTheme(mode) {

    let oldMode

    if (mode === "sombre") {
        oldMode = "clair"
    } else {
        oldMode = "sombre"
    }

    if (mode !== null) {
        document.body.classList.remove(oldMode)
        document.body.classList.add(mode)
    } else {
        localStorage.setItem("theme", "clair")
        document.body.classList.add("clair")
    }
}

function setNbApprenants(apprenants) {
    let nbApprenants = apprenants.length
    let spanNbApprenants = document.getElementById("nbApprenants")

    spanNbApprenants.innerText = nbApprenants

}

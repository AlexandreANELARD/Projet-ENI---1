// Permet de lancer le script quand la page HTML a fini de charger
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

        // Ecouteur pour le changement ponctuel d'affichage. Il affiche selon quel id a été sélectionné
        ["list", "cards"].forEach(id => {
            document.getElementById(id).addEventListener("change", () => changeAffichage(id));
        })

        // Initialisation des écouteurs pour la fermeture du modal afin d'éviter la duplication de code
        setModal()
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
        // Récupération et lecture du JSON
        fetch("promo.json").then(response => response.json()).then(data => {
            setInfos(data.infoSession)
        })
    }

    // Abonnement à la page de la carte
    if (document.getElementById("page-carte") !== null) {
        const carte = L.map("map").setView([47.21, -1.55], 12)
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(carte)

        // Récupération et lecture du JSON
        fetch("promo.json").then(response => response.json()).then(data => {
            setPin(data.apprenants, carte)
        })
    }

    // Application du thème choisi dans les préférences
    const themeLocalStorage = localStorage.getItem("theme")
    changeTheme(themeLocalStorage)

    // Récupération et lecture du JSON
    fetch("promo.json").then(response => response.json()).then(data => {
        setTitle(data.infoSession)
    })
}

// Fonction qui lit le localStorage selon un paramètre donné et renvoie true ou false
function checkPreference(which) {

    if (which === "both") {
        // Pas de if/else car l'expression telle quelle renvoie déjà un true/false
        // Si la valeur retournée est "true" alors c'est que le localStorage est vide
        return localStorage.getItem("theme") === null || localStorage.getItem('affichage') === null
    } else if (which === "theme") {
        return localStorage.getItem("theme") === null
    } else if (which === "affichage") {
        return localStorage.getItem('affichage') === null
    }


}

// Fonction qui enregistre les choix de l'utilisateur de la page préférence dans le localStorage
function setPreference() {
    const theme = document.getElementById("theme").value
    const affichage = document.querySelector('input[name="affichage"]:checked').value

    localStorage.setItem("theme", theme)
    localStorage.setItem("affichage", affichage)

    // Appel de la fonction changeTheme pour être directement appliqué lors du clic sur le bouton "enregistrer"
    changeTheme(theme)
}

// Fonction créant le tableau en recevant les données du JSON
function setTable(apprenants) {
    let tabApprenants = document.getElementById("liste-apprenants")
    const infosApprenants = ["nom", "prenom", "ville"]

    // Une double boucle permettant d'afficher les données par rapport au JSON et au tableau JS infosApprenants
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
        detail.setAttribute("class", "bouton-modal")
        detail.innerText = "Détail"
        tabRow.append(tabDataDetail)
        tabDataDetail.append(detail)

        // Ecouteur sur les liens générés plus tôt
        detail.addEventListener("click", (e) => { showModal(e, apprenants[i]) })
    }
}

// Fonction créant les cartes en recevant les données du JSON
function setCards(apprenants) {
    const infosApprenants = ["nom", "prenom", "ville"]
    const conteneurCartes = document.getElementById("conteneur-cards")

    // Une double boucle permettant d'afficher les données par rapport au JSON et au tableau JS infosApprenants
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

        // Ecouteur sur les liens générés plus tôt
        detail.addEventListener("click", (e) => { showModal(e, apprenants[i]) })
    }
}

// Fonction permettant d'afficher le tableau ou les cartes selon ce qui a été choisi.
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
    } else if (mode === null) { // Si c'est null, on initialise l'affichage sur "list" par défaut avant d'afficher le tableau
        localStorage.setItem("affichage", "list")
        document.getElementById("list").checked = true
        tableau.style.display = ""
        cards.style.display = "none"
    }
}

// Fonction qui change le thème du site selon les préférences enregistrées dans le localStorage
// La fonction a un paramètre car elle est appelée 2x : la première lors de l'initialisation avec la valeur du localStorage et la 2e avec la valeur envoyée quand on la choisit dans les préférences
function changeTheme(mode) {

    // Variable permettant de stocker l'état de l'ancien theme
    let oldMode

    if (mode === "sombre") {
        oldMode = "clair"
    } else {
        oldMode = "sombre"
    }

    // Branche conditionnelle permettant de retirer l'ancien theme et d'ajouter le nouveau pour éviter d'avoir un conflit de classe
    if (mode !== null) {
        document.body.classList.remove(oldMode)
        document.body.classList.add(mode)
    } else {
        localStorage.setItem("theme", "clair")
        document.body.classList.add("clair")
    }
}


// Fonction qui permet l'affichage dynamique du h1 du site
function setTitle(infoSession) {
    const titleH1 = document.getElementById("title")
    titleH1.innerText = "Promo " + infoSession.nom
}

// Fonction affichant les informations de la promo depuis le JSON sur la page "informations.html"
function setInfos(infoSession) {
    // Déclaration des constantes contenant les éléments HTML pour modification dynamique à partir du JSON
    const dateDebut = document.getElementById("date-debut")
    const dateFin = document.getElementById("date-fin")
    const nbApprenants = document.getElementById("nbApprenants")
    const description = document.getElementById("description-p")

    // Mise à jour des éléments HTML avec les données du JSON
    dateDebut.innerText = infoSession.dateDebut
    dateFin.innerText = infoSession.dateFin
    nbApprenants.innerText = infoSession.nbEtudiants
    description.innerText = infoSession.description

}

// Fonction ajoutant les petits pins sur la carte pour y afficher l'emplacement des apprenants
// Elle reçoit la carte créée dans l'init pour y placer les pins, ainsi que les données du JSON où sont notées les coordonnées
function setPin(apprenants, carte) {

    for (let i = 0; i < apprenants.length; i++) {
        if (apprenants[i].coordonnees !== undefined) { // Cette condition permet de vérifier si un apprenant a des coordonnées. Si oui, on place le pin, sinon on l'ignore.
            const latitude = apprenants[i].coordonnees.latitude
            const longitude = apprenants[i].coordonnees.longitude

            L.marker([latitude, longitude]).addTo(carte)
        }
    }

}


// Fonction qui met en place les écouteurs pour fermer le modal
function setModal() {
    const overlay = document.getElementById("overlay")
    overlay.addEventListener("click", (e) => { hideModal(e) })
    window.addEventListener("keydown", (e) => { hideModal(e) })
}

// Fonction affichant le modal
function showModal(event, apprenants) {
    event.preventDefault() // Empêche le comportement classique du <a href="#"> qui remonterait au début de la page
    document.getElementById("overlay").style.display = "flex" // Affiche le modal

    // Déclaration des variables afin de remplir le modal
    const avatarApprenant = document.getElementById("avatar")
    const nomApprenant = document.getElementById("champ-nom")
    const prenomApprenant = document.getElementById("champ-prenom")
    const villeApprenant = document.getElementById("champ-ville")
    const anecdotesApprenant = document.getElementById("champ-anecdotes")
    let cheminAvatar

    // Création du chemin dynamique pour l'avatar des apprenants
    // Si l'apprenant a un avatar dans le JSON, alors on remplace son chemin, sinon on lui attribue l'avatar par défaut, même s'il n'est pas noté dans le JSON
    if (apprenants.avatar) { // La condition vérifie que le champ avatar existe. Si avatar est manquant ou que la valeur est "", les 2 sont considérés comme faux
        cheminAvatar = "assets/images/" + apprenants.avatar
    } else {
        cheminAvatar = "assets/images/avatar.png"
    }

    // Mise à jour des valeurs avec les informations de l'apprenant contenues dans le JSON
    avatarApprenant.setAttribute("src", cheminAvatar)
    nomApprenant.innerText = apprenants.nom
    prenomApprenant.innerText = apprenants.prenom
    villeApprenant.innerText = apprenants.ville
    anecdotesApprenant.innerText = apprenants.anecdotes

}

// Fonction faisant disparaître le modal
function hideModal(event) {
    const overlay = document.getElementById("overlay")
    if (event.target === overlay || event.key === "Escape") { // Si la cible du clic est l'overlay ou si la touche échap est pressée lors de la navigation sur le site, le modal disparaît, sinon il reste
        overlay.style.display = "none"
    }
}

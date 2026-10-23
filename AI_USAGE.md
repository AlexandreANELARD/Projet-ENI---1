# Utilisation de l'IA : Projet PromoENI (itération 1)

En vertu de la charte IA de l'ENI, ce fichier déclare l'aide de l'IA au cours de ce projet.
Il se veut le plus honnête possible, et j'atteste sur l'honneur la véracité de ces propos.

## Outil utilisé
- Nom de l'outil : Claude (abonnement Pro), avec la fonction « Projet » qui permet un system prompt global à toutes les conversations du projet « ENI ». Le prompt est reproduit en fin de document.
- Contexte d'utilisation :
  - Tutorat : l'IA m'explique des notions que j'ai du mal à comprendre.
  - Correction : à plusieurs reprises, je l'ai sollicitée pour corriger mes erreurs de syntaxe et de grammaire.
  - Explication : surtout sur la logique du code, pour que mon code fonctionne.
  - Coéquipier : elle m'accompagne pendant la conception, pour structurer mes idées avant d'écrire le code.

## Parties concernées
| Fichier / partie | Nature de l'aide de l'IA | Ce qui vient de moi |
|---|---|---|
| Fichiers HTML | Correction de balises (balises qui se croisent dans `preferences.html`), pistes de structure | L'écriture de toutes les pages et leur structure |
| `style.css` (accueil, tableau, cartes, thème sombre) | Pistes, explications de notions, corrections ciblées | La grande majorité des règles, écrites et testées par tâtonnement |
| `style.css` (page Préférences) | Pistes et explications, plusieurs blocs de code fournis (voir ci-dessous) | La structure HTML de la page, les ajustements, les tests |
| `style.css` (version nettoyée) | Version remise au propre fournie par l'IA | Je l'ai retapée à la main, bloc par bloc |
| `script.js` | Erreurs signalées, explications, une fonction corrigée fournie | La logique, les fonctions, les écouteurs, le `localStorage`, le thème |
| `carte.html` | Aucune aide proposée | CDN de Leaflet ajouté par moi via la documentation officielle, création de la div pour la carte|
| `script.js` | l'IA a signalé des erreurs de syntaxe | bloc de la page et fonction `setPin` écrite par moi |
| `style.css` (page carte) | Aucune aide proposée| Règles de style concernant la carte écrite par moi |
| `style.css` (modal) | M'a aidé pour centrer le modal au centre de l'écran | Règles de style concernant le modal écrite par moi |

## Code fourni directement par l'IA
Ces passages ont été écrits par l'IA, puis retapés par moi et testés :
- La version nettoyée de `style.css` (sections, `currentColor`, regroupement du thème sombre).
- Le bloc des boutons de la page Préférences (`#bouton-preferences` en flex, fond transparent, `font: inherit`).
- Le bloc d'alignement de la page Préférences (`grid-template-columns: 3fr 1fr`, `width: 75%` sur la légende, `justify-self: start`), ainsi que les valeurs d'espacement (`row-gap`, `margin-bottom`).
- La fonction `setCards` de `script.js`, fournie en version corrigée à ma demande.
- Plus tôt, plusieurs fragments courts : largeur du `nav` avec `flex: 1`, `float` sur la légende, bordures du tableau (`border-right`, `th:last-child`).
- Dans `preferences.html` : la structure corrigée de `#bouton-preferences` (balises croisées) et l'exemple d'une `div` par paire de radios.
- L’exemple L.map("map").setView(...), L.tileLayer(...).addTo(...) et L.marker([...]).addTo(...), donné avec des coordonnées de Paris. Je l’ai retapé et adapté à Nantes.

## Apports de l'IA
- Notions expliquées qui ne sont pas dans mon cours, ou que je n'ai pas retrouvées dans mes supports :
  - CSS : `gap`, `overflow` et `max-height` (barre de défilement), `grid-column: 1 / -1`, `justify-self`, `font: inherit` sur un bouton.
  - La cascade CSS se calcule propriété par propriété (un `id` n'écrase que les propriétés qu'il déclare).
  - Les styles par défaut du navigateur sur les contrôles de formulaire (marges du `fieldset`, de la `legend` et des radios).
- Pistes et indices donnés :
  - HTML (`preferences.html`) : une `div` autour des deux lignes thème + format pour pouvoir sortir le bouton de la grille, une `div` par paire label/input pour les empiler, un parent commun au lien et au bouton. Accueil : sortir le `fieldset` du header.
  - CSS :
    - Flexbox : `justify-content`, `align-items`, `flex: 1` avec une largeur sur le conteneur, `margin-left: auto`, légende en `float`.
    - Tableau : `nth-child(odd)`, `border-collapse: separate`, bordure d'un seul côté, `sticky`, `overflow` + `max-height`.
    - Thème sombre : spécificité (`.sombre a` contre `.header-button`), `currentColor`, `.sombre td a`.
    - Cartes et grille : `grid-template-columns` sur le conteneur, `inline-block`.
    - Préférences : `flex-direction: column`, sélecteurs par `id`, grille sur une `div`, `width` et non `height`, remise à zéro des marges par défaut.
    - Le `box-sizing` pour faire correpondre mes éléments avec la fenêtre, utile pour la responsivité
    - Correction des notions vues lors du cours : `@media`
    - Lighthouse : L'IA m'a aidé à lire les rapports de l'outils de Google Chrome
  - JS :
    - Erreurs signalées dans `setCards` et `changeAffichage` (portée de `pData`, conteneur absent au chargement, `append[...]`, mauvais élément masqué), que j'ai corrigées moi-même avant de demander la correction de `setCards`.
    - Explications : `const` et objets, `classList.toggle(nom, condition)`.
    - Commentaires : L'IA à corrigé mes fautes d'orthographe et de syntaxe
- Autres :
  - Notion : la sous-page sur l'import de police et un récapitulatif des corrections ont été rédigés par l'IA dans mon espace Notion, pour que je les relise.
  - Un QCM d'auto-évaluation sur mon propre code (HTML, CSS, JS).

## Ce que j'ai fait moi-même
- Structure HTML : toutes les pages ont été écrites par moi. L'IA a corrigé la syntaxe et la grammaire, et signalé des balises croisées.
- JS : la logique, les fonctions, les écouteurs, le `localStorage` et le thème sont de ma main. L'IA a signalé des erreurs dans `setCards` et `changeAffichage`, puis, à ma demande, fourni une version corrigée de `setCards`.
- CSS : beaucoup de règles sont de moi, après des pistes de l'IA et des tests dans les outils de développement. Quand je tournais en rond, certains passages ont été écrits par l'IA (voir « Code fourni directement »), avec des explications que j'ai rangées dans mon Notion.
- Tests et vérifications : j'ai testé à la main la mise en page et le JS. L'IA a aussi ouvert mes pages dans un navigateur et mesuré des positions en pixels, pour avoir un second avis.

## Modifications et appropriation
- Retapé : la version nettoyée du CSS et `setCards`, retapés à la main.
- Adapté : le nom de certains `id`, les valeurs de largeur et d'espacement, après tests.
- Refusé ou pas suivi : `<button>` pour « Détail » (je garde `<a>` avec `preventDefault()`), `toggle(mode, true)` (je garde `remove` + `add`), un raccourcissement de la légende de la maquette.
- Ce que j'ai testé : chaque changement CSS a été rechargé et vérifié en thème clair et en thème sombre.

## Mon niveau de compréhension
- Ce que je sais expliquer sans aide :
  - HTML : la structure de mes pages et mes choix.
  - JS : chaque fonction, écouteur et variable de `script.js`.
  - CSS : une grande partie des règles de `style.css`.
- Ce qui reste fragile :
  - CSS : c'est ma principale difficulté, et la partie où l'aide de l'IA a été la plus importante.
  - HTML : mes points faibles au QCM sont les radios (`name`), la `div` autour du `table` et `<button>` contre `<a>`.

## Limites et erreurs de l'IA constatées
- Elle a fait des erreurs que j'ai relevées et qu'elle a reconnues : deux pistes contradictoires sur le flex, un renvoi vers une page de cours qui ne parlait pas de `gap`, un nombre de lignes contredit par la maquette, une règle `justify-content` inutile.
- Elle peut se baser sur une version périmée de mes fichiers : il faut lui redonner le code à jour.
- À cause de mon prompt, elle ne me donne pas de code sans demande explicite, et reste parfois vague de peur de donner la réponse.

## Avantages constatés
- Le projet garde une mémoire de ce que j'ai déjà vu, ce qui permet un suivi de progression. Elle connaît mes lacunes en CSS.
- La dimension pédagogique : grâce à mon prompt, elle montre d'autres exemples que ceux du cours.
- Elle me challenge : je lui ai demandé de ne pas valider mes propositions, ce qui pousse la réflexion sur la logique du code.

## System prompt utilisé dans le projet nommé « ENI »

Rôle

Tu es un professeur confirmé de développement Web et Web Mobile, et tu m'accompagnes tout au long de ma formation à l'ENI (cursus Développeur Web et Web Mobile). Ton objectif est de développer ma compréhension et mon autonomie. Pour ça, j'ai besoin d'un retour exigeant et honnête, pas d'encouragements.

Exigence et honnêteté

Quand j'ai une vraie erreur de logique ou de compréhension, dis-le immédiatement et sans détour, dès la première phrase : "Non, c'est faux", "Ce code ne fonctionne pas", "Ton raisonnement est incorrect". Ensuite seulement, explique pourquoi. Pour une simple coquille de syntaxe (typo, casse, orthographe d'un nom de variable), signale-la normalement, sans ouvrir sur "Non" ou "Stop" — ce ton direct est réservé aux vraies erreurs de raisonnement, pas aux fautes de frappe.
Ne cherche pas à valider ce que je dis. Si ma réponse est partiellement juste, précise clairement ce qui est juste et ce qui est faux, sans laisser de flou.
Ne me complimente pas par défaut. Ne dis que c'est bien que si c'est vraiment correct, et signale aussi ce qui fonctionne mais reste maladroit (nommage, lisibilité, mauvaise pratique). Les remarques de forme (nommage, coquilles, cohérence orthographique) sont secondaires à la logique algorithmique : regroupe-les en une seule fois à la fin de ta réponse, ne les traite jamais comme un obstacle empêchant de continuer, sauf si elles rendent le code réellement invalide (erreur de syntaxe bloquante).
Si je conteste ta correction sans argument valable, maintiens ta position. Ne change d'avis que si je t'apporte un vrai argument technique.
Si tu soupçonnes qu'une réponse vient d'un outil externe non retravaillé, formule-le comme une question ouverte ("d'où vient cette syntaxe, elle diffère de ce que tu m'as donné ?"), jamais comme une accusation ferme — tu n'as pas de moyen de vérifier la source avec certitude.

Pédagogie (mode par défaut)

Quand je te soumets un exercice ou un problème, ne donne pas la solution d'emblée : pointe l'erreur, donne une piste, pose une question qui me fait avancer. Illustre toujours ta question avec un exemple concret plutôt qu'une formulation abstraite ou générale.
Si je ne réponds pas à une question après deux tentatives, ou si je te dis qu'elle n'est pas pertinente, reformule-la différemment ou laisse tomber et avance. Ne répète jamais la même question telle quelle une troisième fois.
Si je bloque plusieurs fois sur le même point, propose un mini-exercice ou une question de vérification.
Si je demande un exemple de syntaxe ou de concept, donne un court extrait illustratif.
Adapte le niveau d'explication à ma progression dans le cursus (je préciserai où j'en suis si besoin).

Correction complète (sur demande)

Quand je demande explicitement la correction ("donne-moi la correction", "montre la solution", "corrige"), donne-la immédiatement et en entier, sans négocier, sans me reposer de questions et sans me demander si je suis sûr. C'est ma décision, je l'ai prise en connaissance de cause.
Accompagne-la d'une explication des points clés et de ce qui différait de ma tentative, pour que la correction serve d'apprentissage.

Supports de cours (PDF joints)

Base-toi en priorité sur le contenu des PDF fournis dans ce Project (référentiel, supports de cours ENI).
Si une question porte sur une notion absente des PDF, dis-le explicitement avant de répondre avec tes connaissances générales.

Format

Pour du code à analyser : verdict d'abord, puis explications ciblées, ligne par ligne si besoin.
Reste concis et va à l'essentiel.

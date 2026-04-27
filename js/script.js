// =============================================
// PROTECTION DES PAGES (sauf index.html)
// =============================================
const pageCourante = window.location.pathname.split("/").pop();

if (pageCourante !== "index.html" && pageCourante !== "") {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// =============================================
// CONNEXION
// =============================================
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email    = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorDiv = document.getElementById("error-message");

        errorDiv.textContent = "";

        if (email === "" || password === "") {
            errorDiv.textContent = "Veuillez remplir tous les champs.";
            return;
        }

        if (email === "user@club.tn" && password === "1234") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            window.location.href = "home.html";
        } else {
            errorDiv.textContent = "Email ou mot de passe incorrect.";
        }
    });
}

// =============================================
// BURGER MENU
// =============================================
const burger = document.querySelector(".burger");
if (burger) {
    burger.addEventListener("click", function() {
        burger.classList.toggle("active");
        document.querySelector(".main-nav").classList.toggle("active");
    });
}

// =============================================
// DÉCONNEXION
// =============================================
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        logout();
    });
}

// =============================================
// DONNÉES DES ÉVÉNEMENTS
// =============================================
const evenements = [
    {
        id: 1,
        titre: "Soirée Gnawa Traditionnelle",
        date: "15 mars 2026 – 20h00",
        lieu: "Dar Lasram, Médina de Tunis",
        image: "image1.jpg",
        description: "Cette soirée met à l'honneur la musique Gnawa traditionnelle dans un cadre culturel authentique. Venez découvrir des rythmes captivants, des mélodies envoûtantes jouées aux krakeb et au guembri, portées par des maîtres musiciens.",
        places: "45 places disponibles"
    },
    {
        id: 2,
        titre: "Expo Art Contemporain",
        date: "22 mars 2026 – Journée entière",
        lieu: "La Marsa, Tunis",
        image: "image2.jpg",
        description: "Plongez au cœur de la création artistique contemporaine lors de cette exposition immersive à La Marsa. Des artistes tunisiens et méditerranéens exposent leurs œuvres mêlant peinture, sculpture, photographie et art numérique.",
        places: "60 places disponibles"
    },
    {
        id: 3,
        titre: "Atelier Théâtre",
        date: "28 mars 2026 – 15h00",
        lieu: "Musée du Bardo, Tunis",
        image: "image3.jpg",
        description: "Rejoignez notre atelier théâtre ouvert à tous les niveaux au musée du Bardo. Animé par des comédiens professionnels, cet atelier vous initiera aux techniques de base de l'art dramatique : expression corporelle, improvisation et mise en scène.",
        places: "30 places disponibles"
    },
    {
        id: 4,
        titre: "Soirée Poésie",
        date: "5 avril 2026 – 19h00",
        lieu: "Carthage, Tunis",
        image: "image4.jpg",
        description: "Plongez dans l'univers envoûtant de la poésie lors de cette soirée exceptionnelle à Carthage. Des poètes tunisiens et internationaux partageront leurs œuvres entre vers classiques et poésie contemporaine.",
        places: "50 places disponibles"
    },
    {
        id: 5,
        titre: "Concert de Musique Andalouse",
        date: "20 avril 2026 – 21h00",
        lieu: "Théâtre Municipal, Tunis",
        image: "image1.jpg",
        description: "Laissez-vous emporter par les mélodies envoûtantes de la musique andalouse lors de ce concert exceptionnel au Théâtre Municipal de Tunis. Des musiciens de renom interpréteront des œuvres classiques du répertoire arabo-andalou.",
        places: "80 places disponibles"
    }
];

// =============================================
// PAGE ACCUEIL – GRILLE DES ÉVÉNEMENTS
// =============================================
const grille = document.querySelector(".grid-evenements");

if (grille) {
    grille.innerHTML = "";

    evenements.forEach(function(ev) {
        const article = document.createElement("article");
        article.classList.add("card-event");

        article.innerHTML = `
            <img src="${ev.image}" alt="${ev.titre}">
            <h3>${ev.titre}</h3>
            <p>Date : ${ev.date} | Lieu : ${ev.lieu}</p>
            <a href="event-details.html?id=${ev.id}" class="btn">Voir détails</a>
        `;

        grille.appendChild(article);
    });
}

// =============================================
// PAGE DÉTAIL ÉVÉNEMENT (event-details.html)
// =============================================
const eventTitre = document.getElementById("event-titre");

if (eventTitre) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const evenement = evenements.find(ev => ev.id === id);

    if (evenement) {
        document.getElementById("event-titre").textContent = evenement.titre;
        document.getElementById("event-image").src = evenement.image;
        document.getElementById("event-image").alt = evenement.titre;
        document.getElementById("event-infos").textContent = "Date : " + evenement.date + " | Lieu : " + evenement.lieu + " | " + evenement.places;
        document.getElementById("event-description").textContent = evenement.description;
        document.getElementById("inscription-link").href = "register-event.html?id=" + evenement.id;
    }
}

// =============================================
// PAGE INSCRIPTION (register-event.html) – TÂCHE 2
// =============================================
const registerForm = document.getElementById("register-form");

if (registerForm) {

    // Afficher le titre de l'événement si ID présent dans l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get("id"));
    const eventCible = evenements.find(ev => ev.id === eventId);
    const registerTitre = document.getElementById("register-titre");

    if (eventCible && registerTitre) {
        registerTitre.textContent = "Inscription à l'événement : " + eventCible.titre;
    }

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const successDiv = document.getElementById("success-message");
        const errorDiv   = document.getElementById("error-message");

        // Masquer les messages précédents
        successDiv.style.display = "none";
        successDiv.textContent   = "";
        errorDiv.style.display   = "none";
        errorDiv.textContent     = "";

        // Récupération des valeurs
        const nom       = document.getElementById("nom").value.trim();
        const email     = document.getElementById("email").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const places    = parseInt(document.getElementById("places").value);
        const message   = document.getElementById("message").value.trim();

        // ---- Validation ----
        if (nom.length < 3) {
            errorDiv.textContent = "Le nom doit contenir au moins 3 caractères.";
            errorDiv.style.display = "block";
            return;
        }

        if (!email.includes("@")) {
            errorDiv.textContent = "L'adresse email n'est pas valide (elle doit contenir @).";
            errorDiv.style.display = "block";
            return;
        }

        if (!/^\d{8}$/.test(telephone)) {
            errorDiv.textContent = "Le téléphone doit contenir exactement 8 chiffres.";
            errorDiv.style.display = "block";
            return;
        }

        if (isNaN(places) || places < 1 || places > 10) {
            errorDiv.textContent = "Le nombre de places doit être compris entre 1 et 10.";
            errorDiv.style.display = "block";
            return;
        }

        // ---- Création de l'objet inscription ----
        const inscription = {
            evenementId:    eventId || null,
            evenementTitre: eventCible ? eventCible.titre : "Événement",
            evenementDate:  eventCible ? eventCible.date  : "",
            evenementLieu:  eventCible ? eventCible.lieu  : "",
            nom:       nom,
            email:     email,
            telephone: telephone,
            places:    places,
            message:   message,
            dateInscription: new Date().toLocaleString("fr-FR")
        };

        // ---- Sauvegarde dans localStorage ----
        let inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];
        inscriptions.push(inscription);
        localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

        // ---- Message de succès + redirection ----
        successDiv.textContent = "Inscription réussie ! Vous allez être redirigé vers votre profil...";
        successDiv.style.display = "block";
        registerForm.reset();

        setTimeout(function() {
            window.location.href = "profile.html";
        }, 2000);
    });
}

// =============================================
// PAGE PROFIL – TÂCHES 3 & 4
// =============================================
const userEmailEl       = document.getElementById("user-email");
const inscriptionsListEl = document.getElementById("inscriptions-list");

if (userEmailEl) {
    const email = localStorage.getItem("userEmail") || "utilisateur inconnu";
    userEmailEl.textContent = email;
}

if (inscriptionsListEl) {
    const inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];

    if (inscriptions.length === 0) {
        inscriptionsListEl.innerHTML = "<li>Aucune inscription pour l'instant.</li>";
    } else {
        inscriptionsListEl.innerHTML = "";

        inscriptions.forEach(function(insc, index) {
            const li = document.createElement("li");
            li.style.marginBottom = "1rem";
            li.innerHTML = `
                <strong>${insc.evenementTitre}</strong><br>
                📅 ${insc.evenementDate} &nbsp;|&nbsp; 📍 ${insc.evenementLieu}<br>
                👤 ${insc.nom} &nbsp;|&nbsp; ✉️ ${insc.email} &nbsp;|&nbsp; 📞 ${insc.telephone}<br>
                🎟️ ${insc.places} place(s) &nbsp;|&nbsp; Inscrit le : ${insc.dateInscription}
                ${insc.message ? "<br>💬 " + insc.message : ""}
            `;
            inscriptionsListEl.appendChild(li);
        });
    }
}

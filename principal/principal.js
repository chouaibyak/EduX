// Afficher et masquer la liste des salles
let sallebutton = document.querySelector(".salle-button");
let salleList = document.querySelector(".matierlist");

sallebutton.addEventListener('click', function () {
  this.classList.toggle("active");
  if (salleList.style.display === "none" || salleList.style.display === "") {
    salleList.style.display = "block";
  } else {
    salleList.style.display = "none";
  }
});

// Données de conversation pour chaque salle
let conversations = {
  Math: {
    titre: "Tout le monde est réuni ici sur le groupe de maths ! 🧮",
    description: "Partagez des annonces, des astuces, des ressources ou des questions concernant les cours, les devoirs, ou les défis mathématiques à relever. ⭐",
    messages: [
      { text: "fin a ba abdellah", type: "moi" },
      { text: "wa khoya ha hna m3a dnya kn3diw onta hani kolchi mzn", type: "autre" },
    ],
    icon: "fa-infinity",
    nam: "Math",
  },
  Physics: {
    titre: "Bienvenue dans le groupe de physique ! 🌌",
    description: "Discutez de mécanique, d'électromagnétisme, de thermodynamique et bien plus encore.",
    messages: [
      { text: "Quelqu'un peut m'aider avec les lois de Newton ?", type: "autre" },
      { text: "Oui, je peux t'aider !", type: "moi" },
    ],
    icon: "fa-bolt",
    nam: "Physics",
  },
  IT: {
    titre: "Groupe d'informatique 💻",
    description: "Échangez sur la programmation, les algorithmes, les bases de données et les nouvelles technologies.",
    messages: [
      { text: "Quel langage recommandez-vous pour débuter ?", type: "autre" },
      { text: "Python est un excellent choix pour les débutants.", type: "moi" },
    ],
    icon: "fa-code",
    nam: "IT",
  },
};

// Fonction pour mettre à jour la conversation
function updateConversation(salle) {
  let conversationData = conversations[salle];

  // Mise à jour du head-right
  document.querySelector(".head-right span").innerHTML =
    `<i class="fa-solid ${conversationData.icon}"></i> ${conversationData.nam}`;

  // Mise à jour de la conversation
  document.querySelector(".conversation span").innerHTML =
    `<h1>${conversationData.titre}</h1> ${conversationData.description}`;

  // Vider les messages actuels
  let messageContainer = document.querySelector(".message-container"); // Correction : ".messages-container"
  messageContainer.innerHTML = '';

  // Ajouter les nouveaux messages
  conversationData.messages.forEach((msg) => {
    let messageElement = document.createElement('div');
    messageElement.classList.add(msg.type === "moi" ? "msg-moi" : "msg-autre");
    messageElement.textContent = msg.text;
    messageContainer.appendChild(messageElement);
  });

  // Faire défiler vers le bas
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Ajouter des écouteurs d'événements pour chaque salle
document.querySelectorAll(".salle").forEach((salle) => {
  salle.addEventListener('click', function () {
    let salId = salle.getAttribute("data-salle");
    updateConversation(salId);
  });
});

updateConversation('Math');
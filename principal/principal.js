
// afficher et masquer liste des salles

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





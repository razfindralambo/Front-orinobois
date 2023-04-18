const commandes = JSON.parse(localStorage.getItem("commandes"));

console.log(commandes);

const commandeDisplay = async () => {
  console.log("fonction commande");

  if (commandes) {
    await commandes;
    const dernierElement = commandes[commandes.length - 1];
    console.log(dernierElement);

    blocTitrePanier.innerHTML = `
    <div class="flex-column-start size80"> <h2 id="titre-panier">VOS COMMANDES</h2>
    <span class="trait-design-panier"></span>
    </div>
    <div class="flex-column-centre size80">
    <h3 class="vert">MERCI ${dernierElement.contact.firstName} ${dernierElement.contact.lastName}</h3>
    <h3>Votre derniére commande N° : ${dernierElement.order}</h3>
    <h3>d'un Total de ${dernierElement.Total} E</h3>
    <h3>à bien été pris en compte</h3>
    <h3 class="vert">VOICI LE RECAPITULATIF DE TOUTES VOS COMMANDES</h3>
    <h3>Vous pouvez les annuler à tout moment</h3>
    </div>
    `;

    injectCommande.innerHTML = commandes
      .map(
        (commande) => `
    <div id="basketCommande" class="bg-beige flex-around">
    <div>
      <h3 class="bloc-affiche-commande">
        <p>${commande.contact.firstName}</p>
        <p>${commande.contact.lastName}</p>
      </h3>
    </div>
    <div class="bloc-affiche-commande">
      <h3>Order-Commande</h3>
      <p>Reference :<br/>${commande.order} </p>
    </div>
    <div class="bloc-affiche-commande">
      <h3>Status</h3>
      <p>En cours</p>
      <button id="${commande.order}" class="bouton-annuler">Annuler</button>
    </div>
    <div class="bloc-affiche-commande">
      <h3>Total</h3>
      <p>${commande.Total} E</p>
    </div>
  </div>
    `,
      )
      .slice()
      .reverse()
      .join("");
  }

  let boutonAnnuler = document.querySelectorAll(".bouton-annuler");

  console.log(boutonAnnuler);
  boutonAnnuler.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      console.log(bouton.id);

      let quantiteCommande = commandes.length;

      for (i = 0; i < quantiteCommande; i++) {
        if (quantiteCommande == 1) {
          return (
            localStorage.removeItem("commandes"),
            (location.href = "commande.html")
          );
        }
        if (commandes[i].order == bouton.id) {
          commandes.splice(i, 1);
          localStorage.setItem("commandes", JSON.stringify(commandes));

          console.log("supprime la commande en questions");
          location.href = "commande.html";
        }
      }
    });
  });
};

commandeDisplay();
/////////////////////////////////////// afficher quantite panier ////////////////////////////

let produitLocal = JSON.parse(localStorage.getItem("produit"));

let meubleQuantiteTotal = [];
console.log(produitLocal);

if (produitLocal) {
  produitLocal.forEach((meuble) => {
    meubleQuantiteTotal.push(meuble.quantite);
  });
  spanQuantite.classList.remove("display-none");
  spanQuantite.classList.add("flex-centre");

  spanQuantite.textContent = `${eval(meubleQuantiteTotal.join("+"))} `;
} else {
  spanQuantite.classList.remove("flex-centre");
  spanQuantite.classList.add("display-none");
}

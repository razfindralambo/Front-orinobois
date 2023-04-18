//regex email /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
let someProduct = [];

let reponseServeur = [];

let sommeProduits;

let commandeProducts = JSON.parse(localStorage.getItem("commandes"));

let addProduit = JSON.parse(localStorage.getItem("produit"));

const panierDisplay = async () => {
  console.log("salut");
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    formulaireContact.classList.add("display-none");

      continueCommande.addEventListener("click", () => {
       formulaireContact.classList.remove("display-none");
     });

    blocTitrePanier.classList.add("flex-column-start");
    blocTitrePanier.classList.remove("flex-start");
    blocTitrePanier.innerHTML = `<h2 id="titre-panier">PANIER</h2><span class="trait-design-panier"></span>
    `;

    injectJs.innerHTML = addProduit
      .map(
        (produit) => `
    <div id="basketProduit" class="flex-around">
    <div id="blocImage">
      <img src="${produit.imageUrl} " alt="image meuble ${produit.name} " />
    </div>
    <div id="blocProduit" class="flex-column-around">
      <h2>${produit.name} </h2>
      <p>${produit.teinte} </p>
      <p>${produit.price.toString().replace(/00/, "")} E</p>
      <p>Ref:<br/>${produit._id} </p>
      <p><i class="fas fa-truck"></i> en stock</p>
    </div>
    <div id="bloc-change-produit" class="flex-around">
      <div class="flex-centre">
        <button class="bouton-moins" data-id="${produit._id}" data-teinte="${
          produit.teinte
        }">-</button>
        <span class="produit-quantite">${produit.quantite} </span>
        <button class="bouton-plus" data-id="${produit._id}" data-teinte="${
          produit.teinte
        }">+</button>
      </div>
      <div><p class="prix-total-quantite">
      ${
        produit.quantite * produit.price.toString().replace(/00/, "")
      } E</p></div>
      <div><i class="bouton-corbeille fas fa-trash-alt gris"  data-id="${
        produit._id
      }" data-teinte="${produit.teinte}"></i></div>
    </div>
  </div>
    `,
      )
      .join("");
    calculProduit();

    removeProduct();

    plusQuantite();

    minQuantite();

    return;
  } else {
    formulaireContact.classList.add("display-none");
    continueCommande.addEventListener("click", () => {
      location.href = "panier.html";
      alert("Ajoutez des produits au panier pour continuer");
    });
    spanQuantite.classList.remove("flex-centre");
    spanQuantite.classList.add("display-none");
  }
};

panierDisplay();

const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  console.log("je suis la fonction removeProduct");
  let corbeilles = document.querySelectorAll(".bouton-corbeille");
  console.log(corbeilles);

  corbeilles.forEach((corbeille) => {
    corbeille.addEventListener("click", () => {
      console.log(corbeille);

      let totalAddProduitRemove = addProduit.length;

      console.log(totalAddProduitRemove);

      if (totalAddProduitRemove == 1) {
        return (
          localStorage.removeItem("produit"),
          console.log("remove tout le panier"),
          (location.href = "panier.html")
        );
      } else {
        someProduct = addProduit.filter((el) => {
          if (
            corbeille.dataset.id != el._id ||
            corbeille.dataset.teinte != el.teinte
          ) {
            return true;
          }
        });
        console.log(someProduct);
        localStorage.setItem("produit", JSON.stringify(someProduct));
        calculProduit();
        console.log("corbeille remove le produit en question");
        location.href = "panier.html";
      }
    });
  });
  return;
};

const plusQuantite = async (panierDisplay) => {
  await panierDisplay;
  console.log("fonction plus");
  let plus = document.querySelectorAll(".bouton-plus");
  console.log(plus);
  plus.forEach((positive) => {
    positive.addEventListener("click", () => {
      console.log(positive);

      for (i = 0; i < addProduit.length; i++) {
        if (
          addProduit[i]._id == positive.dataset.id &&
          addProduit[i].teinte == positive.dataset.teinte
        ) {
          return (
            addProduit[i].quantite++,
            localStorage.setItem("produit", JSON.stringify(addProduit)),
            (document.querySelectorAll(".produit-quantite")[i].textContent =
              addProduit[i].quantite),
            (document.querySelectorAll(".prix-total-quantite")[
              i
            ].textContent = `
              ${
                addProduit[i].quantite *
                addProduit[i].price.toString().replace(/00/, "")
              } E`),
            calculProduit(),
            console.log("quantite++")
          );
        }
      }
    });
  });
};

const minQuantite = async (panierDisplay) => {
  await panierDisplay;
  let moins = document.querySelectorAll(".bouton-moins");
  console.log(moins);
  moins.forEach((negative) => {
    negative.addEventListener("click", () => {
      console.log(negative);

      let totalAddProduit = addProduit.length;

      for (i = 0; i < totalAddProduit; i++) {
        console.log(totalAddProduit);
        if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
          return (
            localStorage.removeItem("produit"),
            (location.href = "panier.html"),
            console.log("remove tout le panier")
          );
        }
        if (
          addProduit[i].quantite == 1 &&
          totalAddProduit != 1 &&
          addProduit[i]._id == negative.dataset.id &&
          addProduit[i].teinte == negative.dataset.teinte
        ) {
          addProduit.splice(i, 1);
          localStorage.setItem("produit", JSON.stringify(addProduit));
          location.href = "panier.html";
          console.log("remove le produit en question");
        }
        if (
          (addProduit[i].quantite != 1 &&
            totalAddProduit != 1 &&
            addProduit[i]._id == negative.dataset.id &&
            addProduit[i].teinte == negative.dataset.teinte) ||
          (addProduit[i].quantite != 1 &&
            totalAddProduit == 1 &&
            addProduit[i]._id == negative.dataset.id &&
            addProduit[i].teinte == negative.dataset.teinte)
        ) {
          return (
            addProduit[i].quantite--,
            localStorage.setItem(
              "produit",
              JSON.stringify(addProduit),
              (document.querySelectorAll(".produit-quantite")[i].textContent =
                addProduit[i].quantite),
              (document.querySelectorAll(".prix-total-quantite")[
                i
              ].textContent = `
            ${
              addProduit[i].quantite *
              addProduit[i].price.toString().replace(/00/, "")
            } E`),
              calculProduit(),
              console.log("quantite--"),
            )
          );
        }
      }
    });
  });
};

const calculProduit = async (
  panierDisplay,
  minQuantite,
  plusQuantite,
  removeProduct,
) => {
  await panierDisplay;
  await minQuantite;
  await plusQuantite;
  await removeProduct;

  console.log("je calcule les produits");

  let produitPrice = [];
  let quantiteTotalProduit = [];

  let newTableau = JSON.parse(localStorage.getItem("produit"));
  console.log(newTableau);

  let afficheQuantite = document.querySelectorAll(".produit-quantite");
  console.log(afficheQuantite);

  newTableau.forEach((product) => {
    produitPrice.push(
      product.price.toString().replace(/00/, "") * product.quantite,
    );
    quantiteTotalProduit.push(product.quantite);
  });
  console.log(produitPrice);
  console.log(quantiteTotalProduit);

  nbArticle.textContent = `${eval(quantiteTotalProduit.join("+"))} articles `;

  spanQuantite.classList.remove("display-none");
  spanQuantite.classList.add("flex-centre");
  spanQuantite.textContent = `${eval(quantiteTotalProduit.join("+"))} `;

  console.log(produitPrice.toString());

  sommeProduits = eval(produitPrice.toString().replace(/,/g, "+"));
  console.log(sommeProduits);

  prixArticle.textContent = sommeProduits + " E";
  prixTtc.textContent = sommeProduits + " E";
};

//////////////////////////////////////// formulaire de contact ////////////////////////

const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const adresse = document.getElementById("adresse");
const ville = document.getElementById("ville");

let valuePrenom, valueNom, valueEmail, valueAdresse, valueVille;

prenom.addEventListener("input", function (e) {
  valuePrenom;
  if (e.target.value.length == 0) {
    console.log("rien");
    errorPrenom.innerHTML = "";
    valuePrenom = null;
    console.log(valuePrenom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorPrenom.innerHTML = "Prenom doit contenir entre 3 et 25 caractéres";
    valuePrenom = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorPrenom.innerHTML = "";
    valuePrenom = e.target.value;
    console.log("succes");
    console.log(valuePrenom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    errorPrenom.innerHTML =
      "Prenom ne contient pas de caractéres spécial, chiffre ou accent";
    valuePrenom = null;
    console.log("trop bizarre");
  }
});

nom.addEventListener("input", function (e) {
  valueNom;
  if (e.target.value.length == 0) {
    console.log("rien");
    errorNom.innerHTML = "";
    valueNom = null;
    console.log(valueNom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorNom.innerHTML = "Nom doit contenir entre 3 et 25 caractéres";
    valueNom = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorNom.innerHTML = "";
    valueNom = e.target.value;
    console.log("succes");
    console.log(valueNom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    errorNom.innerHTML =
      "Nom ne contient pas de caractéres spécial, chiffre ou accent";
    valueNom = null;
    console.log("trop bizarre");
  }
});

adresse.addEventListener("input", function (e) {
  valueAdresse;
  if (e.target.value.length == 0) {
    console.log("rien");
    errorAdresse.innerHTML = "";
    valueAdresse = null;
    console.log(valueAdresse);
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    errorAdresse.innerHTML = "Adresse doit contenir entre 3 et 35 caractéres";
    valueAdresse = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    errorAdresse.innerHTML = "";
    valueAdresse = e.target.value;
    console.log("succes");
    console.log(valueAdresse);
  }
  if (
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    errorAdresse.innerHTML =
      "Adresse commence par des chiffres et des lettres pas de spécial ni accent";
    valueAdresse = null;
    console.log("trop bizarre");
  }
});

ville.addEventListener("input", function (e) {
  valueVille;
  if (e.target.value.length == 0) {
    console.log("rien");
    errorVille.innerHTML = "";
    valueVille = null;
    console.log(valueVille);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    errorVille.innerHTML = "Ville doit contenir entre 3 et 25 caractéres";
    valueVille = null;
    console.log("trop court ou trop long");
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    errorVille.innerHTML = "";
    valueVille = e.target.value;
    console.log("succes");
    console.log(valueVille);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    errorVille.innerHTML =
      "Ville ne contient pas de caractéres spécial, chiffre ou accent";
    valueVille = null;
    console.log("trop bizarre");
  }
});

email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    errorEmail.innerHTML = "";
    valueEmail = null;
    console.log(valueEmail);
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorEmail.innerHTML = "";
    valueEmail = e.target.value;
    console.log(valueEmail);
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    errorEmail.innerHTML = "Email incorrect ex: bob@hotmail.fr";
    valueEmail = null;
  }
});

formulaireContact.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("post stopper");

  if (valuePrenom && valueNom && valueEmail && valueVille && valueAdresse) {
    console.log("c'est bon envoie");
    const commandeFinal = JSON.parse(localStorage.getItem("produit"));
    let commandeId = [];
    console.log(commandeFinal);
    console.log(commandeId);

    commandeFinal.forEach((commande) => {
      commandeId.push(commande._id);
    });

    console.log(commandeId);

    const data = {
      contact: {
        firstName: valuePrenom,
        lastName: valueNom,
        address: valueAdresse,
        city: valueVille,
        email: valueEmail,
      },
      products: commandeId,
    };

    console.log(data);

    ///////////////////////////////////  fetch post /////////////////////////////

    fetch("http://localhost:3000/api/furniture/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((promise) => {
        reponseServeur = promise;

        console.log(reponseServeur);
        const dataCommande = {
          contact: reponseServeur.contact,
          order: reponseServeur.orderId,
          Total: sommeProduits,
        };

        if (commandeProducts == null) {
          commandeProducts = [];
          commandeProducts.push(dataCommande);
          localStorage.setItem("commandes", JSON.stringify(commandeProducts));
        } else if (commandeProducts != null) {
          commandeProducts.push(dataCommande);
          localStorage.setItem("commandes", JSON.stringify(commandeProducts));
        }
        localStorage.removeItem("produit");
        location.href = "commande.html";
      });

    prenom.value = "";
    nom.value = "";
    email.value = "";
    ville.value = "";
    adresse.value = "";
    valueAdresse = null;
    valueEmail = null;
    valueNom = null;
    valuePrenom = null;
    valueVille = null;
  } else {
    alert("remplir le formulaire correctement");
  }
});

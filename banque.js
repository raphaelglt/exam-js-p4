const formElement = document.getElementById('exam-form');
const accountElement = document.getElementById('compte');
const ammountElement = document.getElementById('somme');

//écoute quand le formulaire est envoyé
formElement.addEventListener('submit', (event) => {
    //empêche le rechargement de la page
    event.preventDefault();

    //récupère les informations du formulaire
    const account = accountElement.value;
    const amount = ammountElement.value;
})
const formElement = document.getElementById('exam-form');
const accountElement = document.getElementById('compte');
const ammountElement = document.getElementById('somme');

function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
  }

//écoute quand le formulaire est envoyé
formElement.addEventListener('submit', (event) => {
    //empêche le rechargement de la page
    event.preventDefault();

    //récupère les informations du formulaire
    const account = accountElement.value;
    const amount = ammountElement.value;

    checkValues(account, amount)
})

//écoute les changement du champ text du numéro de compte
accountElement.addEventListener('input', (event) => {
    //vérifie si le compte est valide
    if (checkAccount(event.target.value)) {
        //cahnge la couleur de son background
        accountElement.style.backgroundColor = '#6eff33';
    }
})

function checkValues(account, amount) {
    //reçoie la réponse de la fonction checkAccount
    if (checkAccount(account)) {
        console.log('account correct');
        //change le amount (string) en integer
        const amountToNum = Number(amount);
        //vérifie que le montant est supérieur à 0 et est bien un nombre
        if (Number.isInteger(amountToNum) && amount.length>0) {
            console.log('amount correct');
        } else {
            console.log('amount not correct');
        }
    } else {
        console.log('account not correct');
    }
}

//fonction qui vérifié si le numéro de compte
//renvoie true si il l'est sinon false
function checkAccount(account) {
    //change le account (string) en integer
    const accountToNum = Number(account);
    //vérifie que le compte possède 16 caractères et est bien un nombre
    if (Number.isInteger(accountToNum) && account.length===15) {
        return true
    } else {
        return false
    }
}
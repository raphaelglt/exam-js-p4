const formElement = document.getElementById('exam-form');
const accountElement = document.getElementById('compte');
const ammountElement = document.getElementById('somme');

const columns = document.getElementsByClassName('col');
const transactionsElement = columns[0]
const accountSendElement = columns[1]

const transactions = [];
const accountSend = [];

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
        //change le amount (string) en integer
        const amountToNum = Number(amount);
        //vérifie que le montant est supérieur à 0 et est bien un nombre
        if (Number.isInteger(amountToNum) && amount.length>0) {
            //créé un dictionnaire des valeurs
            const data = {
                account,
                amount,
            };
            //fait une requête GET à l'URL suivante avec fetch
            fetch(`http://exjs.apigame.co/data.php?compte=${account}&somme=${amount}`, {
                mode: 'no-cors',
                method: 'post',
                body: new URLSearchParams(data),
            })
            .then((response) => {
                return response.text();
            })
            .then((json) => {
                console.log(json);
            })
            updateFront(data);
            //créé une alert sur le navigateur pour avertir l'utilisateur que la somme a bien été déposée
            alert(`La somme de ${amount} à bien été déposée.`)
        } else {
            //créé une alert sur le navigateur pour avertir l'utilisateur que le champ somme est incorrecte
            alert('Erreur sur le champ somme')
        }
    } else {
        //créé une alert sur le navigateur pour avertir l'utilisateur que le champ compte est incorrecte
        alert('Erreur sur le champ compte')
    }
}

function updateFront(data) {
    const newTransaction = document.createElement('p')
    newTransaction.innerText = `Transaction de ${data.amount} avec ${data.account}`
    transactionsElement.appendChild(newTransaction)
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
// Boutton ajouter un produit
document.querySelector('#ajouter').addEventListener('click',()=>{
    const enregistrer = document.querySelector('.enregistrer')
    document.querySelector('#popup').style.display = 'flex'
    document.querySelector('#valider').style.display = 'block'
    if(enregistrer)
    enregistrer.style.display = 'none'
})
// Boutton fermer le formulaire
document.querySelector('#closeButton').addEventListener('click',()=>{
    document.querySelector('#popup').style.display = 'none'
    location.reload()
})
// Boutton fermer le formulaire des details
document.querySelector('#detailsCloseButton').addEventListener('click',()=>{
    document.querySelector('#details').style.display = 'none'
})

const marque = document.querySelector('#marqueInput')
const nom = document.querySelector('#nomInput')
const prix = document.querySelector('#prixInput')
const date = document.querySelector('#dateInput')
const type = document.querySelector('#typeInput')
const promotion = document.querySelector('Form').promotion
const tableBody = document.querySelector('#tableBody')
const save_edit = document.querySelector('#save_edit')

class Article{
    // counter s'incremente par chaque creation pour differencier entre les ID
static counter = 0
    constructor(marque,nom,prix,date,type,promotion){
        this.marque = marque
        this.nom = nom
        this.prix = prix
        this.date = date
        this.type = type
        this.promotion = promotion
    }
    // Fonction qui remplit l HTML avec des lignes en se basant sur les inputs du formulaire
    insertArticle(){
        Article.showHtml(this.marque,this.nom,this.prix,this.date,this.type,this.promotion)

        return this
    }
    // Fonction qui push les lignes dans le localStorage avec chaque creation d'article
    storeArticle(){
        const allData = JSON.parse(localStorage.getItem('articles')) ?? [] 
        allData.push({marque:this.marque,nom:this.nom,prix:this.prix,date:this.date,type:this.type,promotion:this.promotion})
        localStorage.setItem('articles',JSON.stringify(allData))
    }
    // Fonction qui remplit l HTML depuis le localStorage 
    static showArticles(){
        if(localStorage.getItem('articles')){
            JSON.parse(localStorage.getItem('articles')).forEach((item)=>{
                Article.showHtml(item.marque,item.nom,item.prix,item.date,item.type,item.promotion,item.aId)
            })
        }
    }
    // Fonction qui remplit l HTML
    static showHtml(marque,nom,prix,date,type,promotion,aId){
         
        aId = Article.counter++
        let tableau = document.createElement('tr')
        tableau.innerHTML = `
        <tr>
        <td id="marque${aId}">${marque}</td>
        <td id="nom${aId}">${nom}</td>
        <td id="prix${aId}">${prix}</td>
        <td id="date${aId}">${date}</td>
        <td id="type${aId}">${type}</td>
        <td id="promotion${aId}">${promotion}</td>
        <td><button class="modifierClass" type="button" data-id="${aId}">Modifier</button></td>
        <td><button class="supprimerClass" type="button" id="${aId}">Supprimer</button></td>
        <td><button class="details" id="details${aId}"type="button" onclick=showDetails(${aId})>Détails</button></td>
        </tr>
        `
        tableBody.appendChild(tableau)
    }
}
// On appelle la fonction ici pour garder le tableau meme si on actualise
Article.showArticles(this)

// Fonction pour vider les inputs apres chaque action
function clear() {
    marque.value = ''
    nom.value = ''
    prix.value = ''
    date.value = ''
}
// Fonctions qui verifie la validité des inputs
function isRegexValid(input, regEx) {
    let inputValue = input.value
    if (regEx.test(inputValue) === true) {
        document.querySelector(`#${input.id}Error`).style.display = 'none'
        return true
    }
    else {
        document.querySelector(`#${input.id}Error`).style.display = 'block'
        return false
    }
}
function isDateValid(date) {
    let dateValue = date.value
    if (dateValue === '') {
        document.querySelector(`#${date.id}Error`).style.display = 'block'
        return false
    }
    else {
        document.querySelector(`#${date.id}Error`).style.display = 'none'
        return true
    }
}
function isChecked() {
    if (promotionOui.checked || promotionNon.checked) {
        document.querySelector('#promotionError').style.display = 'none'
        return true
    }
    else {
        document.querySelector('#promotionError').style.display = 'block'
        return false
    }
}
// Fonction qui tri les lignes par l'ordre alphabetique de la colonne "nom"
function sortArticles(){
    const artcls = JSON.parse(localStorage.getItem('articles'))
    artcls.sort(function(a,b){
        if(a.nom.toLowerCase() < b.nom.toLowerCase()) return -1;
        if(a.nom.toLowerCase() > b.nom.toLowerCase()) return 1;
        return 0
    });
    localStorage.setItem('articles',JSON.stringify(artcls))

}
// Fonction onclick qui modifie les articles
function edit(i) {
    // Verification de la validité des inputs avant de modifier
isRegexValid(marque, /^[a-z A-Z]{2,30}$/)
isRegexValid(nom, /^[a-z A-Z]{2,30}$/)
isRegexValid(prix, /^[0-9]+(\.[0-9]{1,2})?$/)
isDateValid(date)
if (isRegexValid(marque, /^[a-z A-Z]{2,30}$/) && isRegexValid(nom, /^[a-z A-Z]{2,30}$/) && isRegexValid(prix, /^[0-9]+(\.[0-9]{1,2})?$/) && isDateValid(date)) {
    // On cree un tableau "artcls" dans lequel on rempli le localStorage
    let artcls = JSON.parse(localStorage.getItem("articles")) ?? [];
    // l'index i est l'argument qui prend la valeur de "counter" de chaque ligne
    // On rempli le tableau par les valeurs modifiées ou non
    artcls[i].marque = marque.value;
    artcls[i].nom = nom.value;
    artcls[i].prix = prix.value;
    artcls[i].date = date.value;
    artcls[i].type = type.value;
    artcls[i].promotion = promotion.value;
    // On insert "artcls" dans le localStorage
    localStorage.setItem("articles", JSON.stringify(artcls));
    // On modifie notre HTML avec les nouvelles valeurs
    document.querySelector('#marque'+i).innerHTML = marque.value
    document.querySelector('#nom'+i).innerHTML = nom.value 
    document.querySelector('#prix'+i).innerHTML = prix.value
    document.querySelector('#date'+i).innerHTML = date.value
    document.querySelector('#type'+i).innerHTML = type.value
    document.querySelector('#promotion'+i).innerHTML = promotion.value
    document.querySelector('#popup').style.display = 'none'
    clear()
    sortArticles()
    // on actualise pour que le tri prendra effet
    location.reload()
}
}
// Fonction onclick qui montre les details de l'article
function showDetails(i){
    document.querySelector('#details').style.display = 'flex'
    document.querySelector(`#marqueDetail`).value = document.querySelector(`#marque${i}`).innerHTML
    document.querySelector(`#nomDetail`).value = document.querySelector(`#nom${i}`).innerHTML
    document.querySelector(`#prixDetail`).value = document.querySelector(`#prix${i}`).innerHTML
    document.querySelector(`#dateDetail`).value = document.querySelector(`#date${i}`).innerHTML
    document.querySelector(`#typeDetail`).value = document.querySelector(`#type${i}`).innerHTML
    document.querySelector(`#promotionDetail`).value = document.querySelector(`#promotion${i}`).innerHTML
}


marque.addEventListener('input', function () {
    isRegexValid(marque, /^[a-z A-Z]{2,30}$/)
})
nom.addEventListener('input', function () {
    isRegexValid(nom, /^[a-z A-Z]{2,30}$/)
})
prix.addEventListener('input', function () {
    isRegexValid(prix, /^[0-9]+(\.[0-9]{1,2})?$/)
})
date.addEventListener('input', function () {
    isDateValid(date)
})
document.querySelector('#valider').addEventListener('click',()=>{
    // Verification en directe de la validité des inputs
isRegexValid(marque, /^[a-z A-Z]{2,30}$/)
isRegexValid(nom, /^[a-z A-Z]{2,30}$/)
isRegexValid(prix, /^[0-9]+(\.[0-9]{1,2})?$/)
isDateValid(date)
// Verification de la validité des inputs en cliquant sur le boutton Ajouter
if (isRegexValid(marque, /^[a-z A-Z]{2,30}$/) && isRegexValid(nom, /^[a-z A-Z]{2,30}$/) && isRegexValid(prix, /^[0-9]+(\.[0-9]{1,2})?$/) && isDateValid(date)) {
    const promotion = document.querySelector('Form').promotion.value
    // ajout d'un nouvel objet
    const newArticle = new Article(marque.value,nom.value,prix.value,date.value,type.value,promotion)
    // inserer cet objet dans le tableau HTML et le localStorage
    newArticle.insertArticle().storeArticle()
    clear()
    sortArticles()
}
})
tableBody.addEventListener('click',(e)=>{
    // Si on clique sur le boutton supprimer 
    if(e.target.classList.contains('supprimerClass')){
        // on rempli artcls avec notre localStorage
        let artcls = JSON.parse(localStorage.getItem('articles'))
        // id prend la valeur de l'id du row
        let id = +e.target.getAttribute('id')
        console.log(id);
        // tableRow prend l HTML du TR
        let tableRow = document.getElementById(id).parentElement.parentElement
        // on supprime la ligne de notre array artcls
        artcls.splice(id,1)
        // on insert a nouveau notre array modifiée au localStorage
        localStorage.setItem('articles',JSON.stringify(artcls))
        // on supprime notre ligne de notre HTML
        tableRow.remove()
        }
        // Si on clique sur le boutton modifier
    if(e.target.classList.contains('modifierClass')){
        // id prend la valeur de l'id du row
        let id = +e.target.getAttribute('data-id')
        // on affiche notre formulaire popup
        document.querySelector('#popup').style.display = 'flex'
        // on cache le  boutton valider
        document.querySelector('#valider').style.display = 'none'
        // et on le remplace avec un nouveau boutton qui contient l ID de la ligne
        save_edit.innerHTML = `<button id="save${id}" class="enregistrer" type="button" onclick="edit(${id})">Enregistrer</button>`
        document.querySelector('.enregistrer').style.display = 'block'
        // on prend les valeurs des cases et on les met dans les inputs de notre formulaire
        marque.value = document.querySelector('#marque'+id).innerHTML
        nom.value = document.querySelector('#nom'+id).innerHTML
        prix.value = document.querySelector('#prix'+id).innerHTML
        date.value = document.querySelector('#date'+id).innerHTML
        type.value = document.querySelector('#type'+id).innerHTML
        promotion.value = document.querySelector('#promotion'+id).innerHTML
        }
})
//Creo array immagini
const imagesArray = [
    "01.webp",
    "02.webp",
    "03.webp",
    "04.webp",
    "05.webp"
]

//Creiamo dinamicamente i div con le immagini del carosello
let itemsContent = '';

for(let i = 0; i < imagesArray.length; i++){
    itemsContent += `<div class="item">
        <img src="./img/${imagesArray[i]}">
    </div>`
}

//inseriamo le immagini nel div che le deve contenere
const itemsSlider = document.querySelector('.item-slider');
itemsSlider.innerHTML += itemsContent;

const itemsPreview = document.querySelector('.preview');
itemsPreview.innerHTML +=itemsContent;

//Prendiamo la prima immagine dell'array e la rendiamo attiva

//const items = document.querySelector('.item'); //ALTERNATIVA
const items = document.querySelectorAll('.slider .item');
const previewItems = document.querySelectorAll('.preview .item');

let itemActive = 0;

items[itemActive].classList.add('active');
previewItems[itemActive].classList.add('active');

//rendo attivo anche il primo cerchio di navigazione

const circles = document.getElementsByClassName('circle');

circles[itemActive].classList.add('active');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

//aggiungo degli EventListener ad ogni cerchio di navigazione e se premuto va a quella immagine
for(let i = 0; i < circles.length; i++){
    let circle = document.getElementById("circle-"+i);
    circle.addEventListener('click', () => {
        removeActive();

        //vado a mettere il mio indice in base a quale cerchio l'utente ha cliccato
        itemActive = i;

    
        addActive();
    });
}

next.addEventListener('click', scroll_Left_Up);

prev.addEventListener('click', scroll_Right_Down);

//Aggiungo gli eventi alla freccia a destra e sotto(puoi scorrere premendo la freccia a destra e sotto)
document.addEventListener('keydown', (event) => {
    
    if(event.key == "ArrowRight" || event.key == "ArrowDown"){
       scroll_Right_Down();
    }

}, false);

//Aggiungo gli eventi alla freccia a sinistra e sopra(puoi scorrere premendo la freccia a sinistra e sopra)
document.addEventListener('keydown', (event) => {

    if(event.key == "ArrowLeft" || event.key == "ArrowUp"){
        scroll_Left_Up();
    }

}, false);

//Auto play pulsante
let interval;
const autoplay = document.getElementById('autoplay-btn');

autoplay.addEventListener("click", function(){

    if(this.innerHTML == `<i class="fa-solid fa-play"></i>`){
        //se clicca il bottone ed ?? in pause scorri il carosello(5s)
        this.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        this.classList.add('active');

        interval = setInterval(scroll_Right_Down, 3000);

    }
    //se clicca il bottone ed ?? in play blocca lo scorrimento
    else{
        this.innerHTML = `<i class="fa-solid fa-play"></i>`;
        clearInterval(interval);
        this.classList.remove('active');
    }
});


//Se il mouse non ?? sopra il bottone, il bottone scompare
autoplay.addEventListener('mouseleave', function(event){

    if(event)
        setTimeout(()=>this.style.opacity = '0', 3500);
    

});

//Se il mouse invece entra nell'area del bottone questo appare
autoplay.addEventListener('mouseenter', function(event){

    if(event)
        this.style.opacity = '1';
    
});


function scroll_Right_Down(){

    removeActive();

    //verifico che non siamo fuori dall'array
    (itemActive < imagesArray.length - 1) ? itemActive++ : itemActive = 0;


    addActive();

}

function scroll_Left_Up(){

    removeActive();

    //verifico che non siamo fuori dall'array
    (itemActive > 0) ? itemActive-- : itemActive = imagesArray.length - 1;

    addActive();

}

//vado a rimuovere la classe active da quello attuale
function removeActive(){
    items[itemActive].classList.remove('active');
    circles[itemActive].classList.remove('active');
    previewItems[itemActive].classList.remove('active');
}

//aggiungere la class active all'elemento precedente dell'Array items e cicle
function addActive(){
    items[itemActive].classList.add('active');
    circles[itemActive].classList.add('active');
    previewItems[itemActive].classList.add('active');
}
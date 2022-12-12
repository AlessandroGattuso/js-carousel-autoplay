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
        //vado a rimuovere la classe active da quello attuale
        items[itemActive].classList.remove('active');
        circles[itemActive].classList.remove('active');
        previewItems[itemActive].classList.remove('active');

        //vado a mettere il mio indice in base a quale cerchio l'utente ha cliccato
        itemActive = i;

        //aggiungere la class active all'elemento precedente dell'Array items e cicle
        items[itemActive].classList.add('active');
        circles[itemActive].classList.add('active');
        previewItems[itemActive].classList.add('active');
    });
}

next.addEventListener('click', () => {

    //vado a rimuovere la classe active da quello attuale
    items[itemActive].classList.remove('active');
    circles[itemActive].classList.remove('active');
    previewItems[itemActive].classList.remove('active');

    //verifico che non siamo fuori dall'array
    (itemActive > 0) ? itemActive-- : itemActive = imagesArray.length - 1;

    //aggiungere la class active all'elemento precedente dell'Array items e cicle
    items[itemActive].classList.add('active');
    circles[itemActive].classList.add('active');
    previewItems[itemActive].classList.add('active');
    
});

prev.addEventListener('click', () => {

    //vado a rimuovere la classe active da quello attuale
    items[itemActive].classList.remove('active');
    circles[itemActive].classList.remove('active');
    previewItems[itemActive].classList.remove('active');

    //verifico che non siamo fuori dall'array
    (itemActive < imagesArray.length - 1) ? itemActive++ : itemActive = 0;

    //aggiungere la class active all'elemento successivo dell'Array items e cicle
    items[itemActive].classList.add('active');
    circles[itemActive].classList.add('active');
    previewItems[itemActive].classList.add('active');
    
})

//Aggiungo gli eventi alla freccia a destra e sotto(puoi scorrere premendo la freccia a destra e sotto)
document.addEventListener('keydown', (event) => {
    
    if(event.key == "ArrowRight" || event.key == "ArrowDown"){
        items[itemActive].classList.remove('active');
        circles[itemActive].classList.remove('active');
        previewItems[itemActive].classList.remove('active');
    
        //verifico che non siamo fuori dall'array
        (itemActive < imagesArray.length - 1) ? itemActive++ : itemActive = 0;
    
        //aggiungere la class active all'elemento successivo dell'Array items e cicle
        items[itemActive].classList.add('active');
        circles[itemActive].classList.add('active');
        previewItems[itemActive].classList.add('active');
    }
}, false);

//Aggiungo gli eventi alla freccia a sinistra e sopra(puoi scorrere premendo la freccia a sinistra e sopra)
document.addEventListener('keydown', (event) => {

    if(event.key == "ArrowLeft" || event.key == "ArrowUp"){
        //vado a rimuovere la classe active da quello attuale
        items[itemActive].classList.remove('active');
        circles[itemActive].classList.remove('active');
        previewItems[itemActive].classList.remove('active');

        //verifico che non siamo fuori dall'array
        (itemActive > 0) ? itemActive-- : itemActive = imagesArray.length - 1;

        //aggiungere la class active all'elemento precedente dell'Array items e cicle
        items[itemActive].classList.add('active');
        circles[itemActive].classList.add('active');
        previewItems[itemActive].classList.add('active');
    }
}, false);

//Auto play pulsante
document.getElementById('autoplay-btn').addEventListener("click", function(){

    let interval;

    if(this.innerHTML == `<i class="fa-solid fa-play"></i>`){
        //se clicca il bottone ed è in pause scorri il carosello(5s)
        this.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        interval = setInterval(() => {
            items[itemActive].classList.remove('active');
            circles[itemActive].classList.remove('active');
            previewItems[itemActive].classList.remove('active');
        
            //verifico che non siamo fuori dall'array
            (itemActive < imagesArray.length - 1) ? itemActive++ : itemActive = 0;
        
            //aggiungere la class active all'elemento successivo dell'Array items e cicle
            items[itemActive].classList.add('active');
            circles[itemActive].classList.add('active');
            previewItems[itemActive].classList.add('active');
        }, 5000);
    }
    //se clicca il bottone ed è in play blocca lo scorrimento
    else{
        this.innerHTML = `<i class="fa-solid fa-play"></i>`;
        clearInterval(interval);
    }
});
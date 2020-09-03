import APIs from './api.js';
import Interfaz from './class.js';
import SaveInStorage from './localStorage.js';


const ui = new Interfaz;
const getData = new APIs();
const saveStorage = new SaveInStorage;
let history = [];
const allCountAPI = []
let API;
let arr;
let count;


//Generando numero ID random para la URL
const noRepeat = () => {
   arr = [];
   while(arr.length < 8) {
         let r = Math.floor(Math.random()* 571) + 1;
         if(arr.indexOf(r) === -1) arr.push(r);
      }
}


//Realizando Busqueda por ID
const input = document.querySelector('.search');
input.addEventListener('keypress', function(e) {
   const urlById = `https://rickandmortyapi.com/api/character/${e.target.value}`;
   const urlByName = `https://rickandmortyapi.com/api/character/?name=${e.target.value}`;
   if(e.keyCode === 13) {
      if(document.querySelector('.main-details')) {
         document.querySelector('.main-details').remove()
      }
      if(parseInt(e.target.value)) {
         getData.dataAPI(urlById)
            .then(data => ui.mainDisplayCard(data))
      } else if(e.target.value === '') {
         alert('Only IDs and Name')
      } else {
         getData.dataAPI(urlByName)
            .then(data => {
               const div = document.querySelectorAll('.main-card-section > div');
               div.forEach(element => {
                  element.remove()
               })
               for(let i = 1; i <= data.info.pages; i++) {
                  const urlPage = `https://rickandmortyapi.com/api/character/?page=${i}&name=${e.target.value}`;
                  getData.dataAPI(urlPage)
                     .then(data => data.results.forEach(element => ui.insertCardsHtml(element, '.main-card-section', 'div')))
               }
            })
            .catch(error => console.log(error))
      }
      }
})

//Simulando carga de datos con el gif
const gifDisplay = (display) => {
   const gif = document.querySelector('.gif');
   gif.style.display = display;
}

// EventListener al cargar DOCUMENTO generar las cards
document.addEventListener("DOMContentLoaded", function() {
   noRepeat();
   arr.forEach(element => {
      API = `https://rickandmortyapi.com/api/character/${element}`;
      getData.dataAPI(API)
         .then(data => {
            ui.insertCardsHtml(data);
         })
   })
   history.push(arr)
   //GetAllLocation count
   getData.dataAPI("https://rickandmortyapi.com/api/location")
   .then(data => ui.renderAllLocation(data))
   //GetallEpisode Count
   getData.dataAPI("https://rickandmortyapi.com/api/episode")
   .then(data => ui.renderAllEpisode(data))
   //GetAllcharacter Count
   getData.dataAPI("https://rickandmortyapi.com/api/character")
      .then(data => ui.renderAllCharacter(data))
   saveStorage.loadFavorites(ui.favoritesDisplay)
})


//xIcon-mainDetails
const mainFirst = document.querySelector('.main-first');
mainFirst.addEventListener('click', function(e) {
   if(e.target.classList.contains('icon-cross')) {
      e.target.parentElement.remove();
   }
})

//xIcon-fav
const xIcon = document.querySelector('.favorite-display');
xIcon.addEventListener('click', function(e) {
   if(e.target.classList.contains('xIcon-fav')) {
      e.target.parentElement.remove();
   }
   saveStorage.deletedStorage(e.target.parentElement.id)
})

function displayOn(name) {
   let x = document.querySelector(name);
   if(x.classList.contains('onview')) {
      x.classList.remove('onview');
   }
   else {
      x.classList.add('onview');
   }
 }

function viewOn() {
   switch(this.classList[1]) {
      case 'fav-btn':
         displayOn('.favorite-display');
      break;
      case 'menu-btn':
         displayOn('.menu-display');
      break;
   }
}
//Menu Button
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', viewOn)

//Favorite button
const favBtn = document.querySelector('.fav-btn');
favBtn.addEventListener('click', viewOn)


//Onclick adding to favoritesDisplay
const card = document.querySelector('.main-card-section');
card.addEventListener('click', function(e) {
   if(e.target.parentElement.parentElement.classList.contains('card')) {
      if(e.target.parentElement.parentElement.classList.contains('is-active')) {
         e.target.parentElement.parentElement.classList.remove('is-active')
      } else {
         e.target.parentElement.parentElement.classList.add('is-active')
      }
   }
   if(e.target.classList.contains('icon-star-empty')) {
      const url = `https://rickandmortyapi.com/api/character/${e.path[2].id}`
      getData.dataAPI(url)
         .then(data => {
            ui.favoritesDisplay(data)
            saveStorage.saveData(data)
         })
   }
})

function getAllCount(mainAPI, render) {
   const div = document.querySelectorAll('.main-card-section > div');
   div.forEach(element => {
      element.remove()
   })
   let urlPage = mainAPI;
   getData.dataAPI(mainAPI)
      .then(data => {
         for(let i = 1; i <= data.info.pages; i++) {
            urlPage += `?page=${i}`;
            getData.dataAPI(urlPage)
               .then(data => data.results.forEach(element => render(element)))
         }
      })
}

//All Character btn
const allCharacter = document.querySelector('.btn-allcharacter');
allCharacter.addEventListener('click', function() {
   getAllCount("https://rickandmortyapi.com/api/character/", ui.insertCardsHtml)
})


//All location
const allLocation = document.querySelector('.btn-location');
allLocation.addEventListener('click', function() {
   getAllCount("https://rickandmortyapi.com/api/location/", ui.renderLocation)
})

const allEpisode = document.querySelector('.btn-episode');
allEpisode.addEventListener('click', function() {
   getAllCount("https://rickandmortyapi.com/api/episode/", ui.renderEpisode)
})

//EventeListener ARROWs
//LEFT
const arrowLeft = document.getElementById('arrow-left');
arrowLeft.addEventListener('click', function() {
   document.querySelectorAll('.card').forEach(element => element.remove())
   gifDisplay('block');
   setTimeout(() => {
      noRepeat();
      arr.forEach(element => {
         API = `https://rickandmortyapi.com/api/character/${element}`;
         getData.dataAPI(API)
            .then(data => {
               ui.insertCardsHtml(data);
         })
      })
      gifDisplay('none')
   }, 3000)
   history.push(arr)
})

//RIGHT
const arrowRight = document.querySelector('.icon-arrow-right');
arrowRight.addEventListener('click', function() {
   let current = history.length - 1;
   const div = document.querySelectorAll('.main-card-section > div');
   div.forEach(element => element.remove())
   history[current].forEach(element => {
      API = `https://rickandmortyapi.com/api/character/${element}`;
      getData.dataAPI(API)
         .then(data => ui.insertCardsHtml(data))
   })

   console.log(history[current])

})

const ui = new Interfaz;
const getData = new APIs();
const history = [];
let arr;



//Realizando Busqueda por ID
const input = document.querySelector('.search');
input.addEventListener('keypress', function(e) {
   if(e.keyCode === 13) {
      if(document.querySelector('.main-details')) {
         document.querySelector('.main-details').remove()
      }
      getData.dataMainFirst(e.target.value)
         .then(data => ui.mainDisplayCard(data))
   }

})

//Guardar datos en Local Storage
const saveData = (data) => {
   let saveId;
   //Toma el valor del Localstorage
   saveId = loadData();
   //Agregar a localStorage el favorito
   saveId.push(data);
   localStorage.setItem('character', JSON.stringify(saveId));
}

//Loading data LocalStorage// Comprueba elementos
const loadData = () => {
   let loadId;
   //Comprobamos localStorage
   if(localStorage.getItem('character') === null) {
      loadId = [];
   } else {
      loadId = JSON.parse(localStorage.getItem('character'));
   }
   return loadId;
}
//Deleted form localStorage
const deletedStorage = (xs) => {
   let characterD;

   characterD = loadData();

   characterD.forEach(function(charact, index) {
      if(charact.id === parseInt(xs)) {
         characterD.splice(index, 1);
      }
   })
   localStorage.setItem('character', JSON.stringify(characterD));
}

//Load favorites LocalStorage
const loadFavorites = () => {
   let character;
   character = loadData();
   character.forEach(function(character) {
      ui.favoritesDisplay(character);
   })
}

//Simulando carga de datos con el gif
const gifDisplay = (display) => {
   const gif = document.querySelector('.gif');
   gif.style.display = display;
}

// EventListener al cargar DOCUMENTO generar las cards
document.addEventListener("DOMContentLoaded", function() {
   for(let i = 0; i < 8; i++) {
      getData.randomData(noRepeat())
         .then(data =>  {
            ui.insertCardsHtml(data)
            history.push(data)
         })
      }
   setTimeout(() => {
      const card = document.querySelectorAll('.card');
      card.forEach(element => element.addEventListener('click', function() {
         if(element.classList.contains('is-active')) {
            element.classList.remove('is-active')
         } else {
            element.classList.add('is-active')
         }
      }))
   }, 1000)
   setTimeout(() => {
      const starIcon = document.querySelectorAll('.icon-star-empty')
      starIcon.forEach(element => element.addEventListener('click', function(e) {
         const url = `https://rickandmortyapi.com/api/character/${e.path[2].id}`
         getData.randomData(url)
            .then(data => {
               ui.favoritesDisplay(data)
               saveData(data)
            })
      }))
   }, 1000)
   loadFavorites();
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
   deletedStorage(e.target.parentElement.id)
})


const cardAction = (element) => {
   if(element.classList.contains('is-active')) {
      element.classList.remove('is-active');
   } else {
      element.classList.add('is-active');
   }
}

 const isActive = () => {
    const x = document.querySelector('.favorite-display')
   if(x.classList.contains('onview')) {
      x.classList.remove('onview');
   }
   else {
      x.classList.add('onview')
   }
 }


const favorites = document.querySelector('.favorites');
favorites.addEventListener('click', function(e) {
   console.log(e)
})

favorites.addEventListener('click', isActive)






//EventeListener ARROWs
//LEFT
const arrowLeft = document.getElementById('arrow-left');
arrowLeft.addEventListener('click', function() {
   document.querySelectorAll('.card').forEach(element => element.remove())
   gifDisplay('block');
   setTimeout(() => {
    for(let i = 0; i < 8; i++) {
      getData.randomData(noRepeat())
         .then(data =>  {
            ui.insertCardsHtml(data)
            history.push(data)
         })
      }
      gifDisplay('none')
   }, 3000)
})

//RIGHT
const arrowRight = document.querySelector('.icon-arrow-right');
arrowRight.addEventListener('click', function() {
   let current = history.length;
   current -= 9;
   let prevData = history[current];
   document.querySelectorAll('.card').forEach(element => element.remove())
   for(let i = 0; i < 8; i++) {
      ui.insertCardsHtml(history[current--])
   }
   console.log(prevData)
})

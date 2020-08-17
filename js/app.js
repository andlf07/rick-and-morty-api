const ui = new Interfaz;
const getData = new APIs();
let arr;


//Realizando Busqueda por ID
const mainDetails = document.querySelectorAll('.main-details');
const input = document.querySelector('.search');
input.addEventListener('keypress', function(e) {
   if(e.keyCode === 13) {
      if(document.querySelector('.main-details')) {
         document.querySelector('.main-details').remove()
      }
      getData.dataMainFirst(e.target.value)
         .then(data => ui.mainDisplayCard(data))
         .then(response =>          document.querySelector('.icon-cross').addEventListener('click', function() {
            document.querySelector('.main-details').remove()
        }))
   }
})



//Eliminando mainDetails
const deleteDetails = () => {
      document.querySelector('.main-details').remove()
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
         .then(data => ui.insertCardsHtml(data))
   }

})

//EventListener CLICK a acada carta y activar la otra cara
const card = document.querySelector('.main-card-section');

const cardAction = (e) => {
   if(e.path[2].classList.contains('is-active')) {
      e.path[2].classList.remove('is-active');
   } else {
      e.path[2].classList.add('is-active');
   }
}

//EventeListener ARROWs
//LEFT
const arrowLeft = document.getElementById('arrow-left');
arrowLeft.addEventListener('click', function() {
   document.querySelectorAll('.card').forEach(element => element.remove())
   gifDisplay('block');
   setTimeout(() => {
    for(let i = 0; i < 8; i++) {
      getData.randomData(noRepeat())
         .then(data => ui.insertCardsHtml(data))
      }
      gifDisplay('none')
   }, 3000)
})
//RIGHT
// const arrowRight = document.querySelector('.icon-arrow-right');
// arrowRight.addEventListener('click', function() {
//    document.querySelectorAll('.card').forEach(element => element.remove())
//    gifDisplay('block');
//    setTimeout(() => {
//       let v = arr;
//     for(let i = 0; i < v.length; i++) {
//          API = `https://rickandmortyapi.com/api/character/${v[i]}`;
//          randomData(API);
//       }
//       gifDisplay('none')
//    }, 3000)
// })
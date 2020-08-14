let API;
let data;
let arr;
//Creando  Cards en insertando
const insertCardsHtml = (data) => {
   const container = document.querySelector('.main-card-section');
   const div = document.createElement('div');
   div.className = 'card';
   div.setAttribute('id', `${data.id}`)
   let htmlTemplate = `
         <div class="card-image">
            <img src=${data.image} alt="">
         </div>
         <div class="card-details">
         <div class="card-name">
            <h1>${data.name}</h1>
         </div>
         <div class="card-specs">
            <p>Gender: ${data.gender}</p>
            <p>Species: ${data.species}</p>
            <p>Status: ${data.status}</p>
            <p>Origin: ${data.origin.name}</p>
            <p>Location: ${data.location.name}</p>
         </div>
         </div>`;


   container.appendChild(div).innerHTML = htmlTemplate;
}

const mainDisplayCard = (data) => {
   const container = document.querySelector('.main-first');
   const div = document.createElement('div');
   div.className = 'main-details';
   div.setAttribute('id', `${data.id}`)
   let htmlTemplate = `
         <div class="main-img-details">
            <img src="${data.image}" alt="">
         </div>
         <div class="main-info-details">
            <span class="icon-cross"></span>
               <div class="main-name">
                  <h1>${data.name}</h1>
               </div>
               <div class="main-specs">
                  <p>Gender: ${data.gender}</p>
                  <p>Species: ${data.species}</p>
                  <p>Status: ${data.status}</p>
                  <p>Origin: ${data.origin}</p>
                  <p>Location: ${data.location}</p>
               </div>
          </div>
   `;
   container.appendChild(div).innerHTML = htmlTemplate;

}
//Obteniendo Datos para MAIN-FIRST
const dataMainFirst = async (id) => {
   const url = `https://rickandmortyapi.com/api/character/${id}`;
   const urlData = await fetch(url);
   data = await urlData.json();
   mainDisplayCard(data);
}




//Obteniendo Datos
const randomData = async (API) => {
   const urlData = await fetch(API);
   data = await urlData.json();
   insertCardsHtml(data);
}

//Realizando Busqueda por ID
const input = document.querySelector('.search')
input.addEventListener('keyup', function(e) {
   if(document.querySelector('.main-first .main-details')) {
      document.querySelector('.main-first .main-details').remove()
   } else {
      dataMainFirst(e.target.value)
   }
})






//Generando numero ID random para la URL
const noRepeat = () => {
   arr = [];
   while(arr.length < 8) {
      let r = Math.floor(Math.random()*591) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
   }
   for(let i = 0; i < arr.length; i++) {
      API = `https://rickandmortyapi.com/api/character/${arr[i]}`;
      return API
   }
}


//Simulando carga de datos con el gif
const gifDisplay = (display) => {
   const gif = document.querySelector('.gif');
   gif.style.display = display;
}

// EventListener al cargar DOCUMENTO generar las cards
document.addEventListener("DOMContentLoaded", function() {
   for(let i = 0; i < 8; i++) {
      randomData(noRepeat())
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

card.addEventListener('click', cardAction)
card.addEventListener('click', function(e) {
   console.log(e)
})



//EventeListener ARROWs
//LEFT
const arrowLeft = document.getElementById('arrow-left');
arrowLeft.addEventListener('click', function() {
   document.querySelectorAll('.card').forEach(element => element.remove())
   gifDisplay('block');
   setTimeout(() => {
    for(let i = 0; i < 8; i++) {
         randomData(noRepeat());
         insertCardsHtml(randomData(noRepeat()))
      }
      gifDisplay('none')
   }, 3000)
})
//RIGHT
const arrowRight = document.querySelector('.icon-arrow-right');
arrowRight.addEventListener('click', function() {
   document.querySelectorAll('.card').forEach(element => element.remove())
   gifDisplay('block');
   setTimeout(() => {
      let v = arr;
    for(let i = 0; i < v.length; i++) {
         API = `https://rickandmortyapi.com/api/character/${v[i]}`;
         randomData(API);
      }
      gifDisplay('none')
   }, 3000)
})
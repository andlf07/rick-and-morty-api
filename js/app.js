
class RenderCards {
   //Rendereizado de cartas al Html
   insertCardsHtml(API) {
      const container = document.querySelector('.main-card-section');
      const div = document.createElement('div');
      div.className = 'card';
      container.appendChild(div);
      //Obteniendo datos
      fetch(API)
         .then(res => res.json())
         .then(data => {
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
                  <p>Name: ${data.name}</p>
                  <p>Species: ${data.species}</p>
                  <p>Status: ${data.status}</p>
                  <p>Origin: ${data.origin}</p>
                  <p>Location: ${data.location.name}</p>
               </div>
      `;
         document.querySelectorAll('.card').forEach(element => div.innerHTML = htmlTemplate);
      })
   }
}


//Generando numero ID random para la URL
const noRepeat = () => {
   let arr = [];
   while(arr.length < 8) {
      let r = Math.floor(Math.random()*591) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
   }
   for(let i = 0; i < arr.length; i++) {
      let API = `https://rickandmortyapi.com/api/character/${arr[i]}`;
      return API
   }

}





const cardsInterfaz = new RenderCards()
// EventListener al cargar DOCUMENTO generar las cards
document.addEventListener("DOMContentLoaded", function() {
   for(let i = 0; i < 8; i++) {
      cardsInterfaz.insertCardsHtml(noRepeat())
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

document.addEventListener("DOMContentLoaded", function(e) {
   console.log(e)
})
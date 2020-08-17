class Interfaz {

   insertCardsHtml(data) {
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

   mainDisplayCard(data) {
      const container = document.querySelector('.main-first');
      const div = document.createElement('div');
      div.className = 'main-details';
      div.setAttribute('id', `${data.id}`)
      let htmlTemplate = `
            <span class="icon-cross" id="xIcon"></span>
            <div class="main-img-details">
               <img src="${data.image}" alt="">
            </div>
            <div class="main-info-details">
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
}
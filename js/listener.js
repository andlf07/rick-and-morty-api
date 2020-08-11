const card = document.querySelector('.main-card-section');


const cardAction = (e) => {
   if(e.path[2].classList.contains('is-active')) {
      e.path[2].classList.remove('is-active');
   } else {
      e.path[2].classList.add('is-active');
   }
}

card.addEventListener('click', cardAction)

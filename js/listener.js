const card = document.querySelector('.card');




const cardAction = () => {
   if(card.classList.contains('is-active')) {
      card.classList.remove('is-active');
   } else {
      card.classList.add('is-active');
   }
}



card.addEventListener('click', cardAction)

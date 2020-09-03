import Interfaz from "./class.js";

class SaveInStorage {

   //Guardar datos en Local Storage
   saveData = (data) => {
      let saveId;
      //Toma el valor del Localstorage
      saveId = this.loadData();
      //Agregar a localStorage el favorito
      saveId.push(data);
      localStorage.setItem('character', JSON.stringify(saveId));
   }
   //Loading data LocalStorage// Comprueba elementos
   loadData = () => {
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
   deletedStorage = (xs) => {
      let characterD;

      characterD = this.loadData();

      characterD.forEach(function(charact, index) {
         if(charact.id === parseInt(xs)) {
            characterD.splice(index, 1);
         }
      })
      localStorage.setItem('character', JSON.stringify(characterD));
   }
   loadFavorites = (ui) => {
      let character;
      character = this.loadData();
      character.forEach(function(character) {
         // Interfaz.favoritesDisplay(character);
         ui(character)
      })
   }
}



export default SaveInStorage;
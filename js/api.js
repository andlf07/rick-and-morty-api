class APIs {
   async dataMainFirst(id) {
      const url = `https://rickandmortyapi.com/api/character/${id}`;
      const urlData = await fetch(url);
      const data = await urlData.json();
      return data
   }
    async randomData(API) {
      const urlData = await fetch(API);
      const data = await urlData.json();
      return data
   }
}
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
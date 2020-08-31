class APIs {
   async dataMainFirst(API) {
      const urlData = await fetch(API);
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
      let r = Math.floor(Math.random()*671) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
   }
   for(let i = 0; i < arr.length; i++) {
      API = `https://rickandmortyapi.com/api/character/${arr[i]}`;
      return API
   }
}
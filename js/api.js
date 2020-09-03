class APIs {
   async dataAPI(API) {
      const urlData = await fetch(API);
      const data = await urlData.json();
      return data
   }
}

export default APIs;
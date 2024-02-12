export class MyStorage {
 
  static async getData(name){
    if(name == 'cart'){
      return localStorage.getItem(name) ? await JSON.parse(localStorage.getItem(name)) : []
    } else {
      return localStorage.getItem(name) ? await JSON.parse(localStorage.getItem(name)) : 0
    }
  }


  static persistData(name, data) {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
    localStorage.setItem(name, JSON.stringify(data));
  }

}

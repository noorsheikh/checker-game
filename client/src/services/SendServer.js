export function SendServer(type, userData) {
    let BaseURL = 'https://20dane.com/test123';
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
    
    return new Promise((resolve, reject) =>{
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => {console.log("in response" + response.json());response.json() } )
          .then((res) => {
            console.log("in res " + res);
            resolve(res);
          })
          /*
          .catch((error) => {
            reject(error);
          });
          .catch((error) => reject({
            networkError: error.message,
          })); */
          .catch((error) => {
            console.log("I got error: " + {error});
            reject(error);
          });
      });
}
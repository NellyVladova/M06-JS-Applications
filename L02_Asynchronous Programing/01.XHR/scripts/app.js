function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   const newRequest = new XMLHttpRequest();

   newRequest.addEventListener('readystatechange', onReady);

   function onReady(){
      if(newRequest.readyState == 4 && newRequest.status == 200){
         const divElement = document.getElementById('res');
         divElement.textContent = newRequest.response;
      }
   }
   newRequest.open('GET', url);
   newRequest.send();
}
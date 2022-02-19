/*___________________________________________*/
/*random api*/
$('.sign_in').click( () => {
  fetch('https://randomuser.me/api/')
   .then(response => response.json()) 
   .then(function(data){
     let user = data.results[0];
     console.log(user.login.password);
     $('#avatar').attr('src', user.picture.large);
     $('#username').text(user.login.username);
     $('#email').text(user.email);
     $('#password').text(user.login.password);
     
   });
 });   


        
/*___________________________________________*/
/*buffer*/

window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
});
/*___________________________________________*/
/*points and avatar*/
function clickCounter() {
  if (localStorage.clickcount) {
    localStorage.setItem("Point",100);
    localStorage.setItem("Point", Math.floor(Math.random(100) * 20000) + 1);
    localStorage.Point = localStorage.getItem("Point")
  } else {
    localStorage.setItem("Point", Math.floor(Math.random(100) * 20000) + 1);
    localStorage.Point = localStorage.getItem("Point")
  }

  document.getElementById("demo").innerHTML = localStorage.Point;
}


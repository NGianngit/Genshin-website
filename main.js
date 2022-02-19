
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
/*restdb api*/

$(".sign_in").on("click", function (e) {
  e.preventDefault();

  let contactusername = $("#username").text();
  let contactemail = $("#email").text();
  let contactpassword = $("#password").text();
  let contactavatar = $("#avatar").text();

  let jsondata = {
      "username": contactusername,
      "email": contactemail,
      "password": contactpassword,
      "avatar": contactavatar,
  };


  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://intergratedprj-3d85.restdb.io/rest/contact",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "620b959834fd6215658585e2",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  }); });

        
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
    document.querySelector("#avatar").addEventListener("change",function (){
      console.log(this.files);
    });
  } else {
    localStorage.setItem("Point",100);
  }

  document.getElementById("demo").innerHTML = localStorage.Point;
}
/*___________________________________________*/


document.getElementById('nav').innerHTML = `
   <div class="container">
      <a href="/" class="logo">
         <img src="../static/img/logo.svg" width="180px" id="logo">
      </a>
      <ul class="main-nav">
         <a href="/">
            <li>Home</li>
         </a>
         <a href="/search">
            <li>Search</li>
         </a>
         <a href="/ourbooks">
            <li>Our Books</li>
         </a>
         <a href="/contactus">
            <li>Contact Us</li>
         </a>
         ${
           !localStorage.getItem('currentUser')
             ? `
                  <a href="/login">
                     <li>Login</li>
                  </a>
                  <a href="/signup">
                     <li>Sign Up</li>
                  </a>
               `
             : `
                  <a href="/borrowedlist">
                     <li>My Borrowed Books</li>
                  </a>  
                  <a onclick="Logout()" style="cursor:pointer;">
                     <li>Logout</li>
                  </a>
               `
         }
      </ul>
   </div>
`

var logo = document.getElementById('logo')
var navlinks = document.querySelectorAll('#nav a')

function Logout() {
  localStorage.removeItem('currentUser')
  window.location.href = '/'
}

window.onload = () => {
  if (window.location.pathname == '/' || window.location.pathname == '/') {
    for (var i = 0; i < navlinks.length; ++i) {
      navlinks[i].style.color = 'white'
    }
    logo.src = '../static/img/logo-white.png'
  }
}

window.onscroll = () => {
  if (window.location.pathname == '/' || window.location.pathname == '/') {
    if (window.scrollY >= 740) {
      for (var i = 0; i < navlinks.length; ++i) {
        navlinks[i].style.color = 'black'
      }
      logo.src = '../static/img/logo.svg'
    } else {
      for (var i = 0; i < navlinks.length; ++i) {
        navlinks[i].style.color = 'white'
      }
      logo.src = '../static/img/logo-white.png'
    }
  }
}

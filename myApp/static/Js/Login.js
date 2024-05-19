var emailInput = document.getElementById('signInEmail')
var passwordInput = document.getElementById('signInPassword')
var btn = document.getElementById('signInButton')
var users = []
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'))
}
function LogIn() {
  if (emailInput.value && passwordInput.value) {
    var user = {
      Email: emailInput.value,
      Password: passwordInput.value,
    }
    const foundUser = users.find((User) => User?.Email === user?.Email)

    if (foundUser) {
      if (foundUser.Password === user.Password) {
        console.log(foundUser.name)
        var logInUser = {
          Name: foundUser.Name,
          id: foundUser.id,
          role: foundUser.role,
        }
        localStorage.setItem('currentUser', JSON.stringify(logInUser))
        if (foundUser.role == 'admin') {
          window.location.href = '/adminHome'
        } else {
          window.location.href = '/'
        }
      } else {
        window.alert('Incorrect email or password !!!')
      }
    } else {
      window.alert('Incorrect email or password !!!')
    }
  }
}

function Valid() {
  var regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!regexEmail.test(emailInput.value)) {
    emailInput.classList.add('is-invalid')
    emailAlert.classList.remove('d-none')
  } else {
    emailInput.classList.add('is-valid')
    emailInput.classList.remove('is-invalid')
    emailAlert.classList.add('d-none')
  }
  if (emailInput.value == '') {
    emailInput.classList.remove('is-invalid')
    emailInput.classList.remove('is-valid')
    emailAlert.classList.add('d-none')
  }

  var regexPasssword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/

  if (!regexPasssword.test(passwordInput.value)) {
    passwordInput.classList.add('is-invalid')
    passwordAlert.classList.remove('d-none')
  } else {
    passwordInput.classList.add('is-valid')
    passwordInput.classList.remove('is-invalid')
    passwordAlert.classList.add('d-none')
  }
  if (passwordInput.value == '') {
    passwordInput.classList.remove('is-invalid')
    passwordInput.classList.remove('is-valid')
    passwordAlert.classList.add('d-none')
  }

  if (regexEmail.test(emailInput.value) && regexPasssword.test(passwordInput.value)) {
    btn.removeAttribute('disabled')
  } else {
    btn.setAttribute('disabled', true)
  }
}

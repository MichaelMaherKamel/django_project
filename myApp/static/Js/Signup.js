var nameInput = document.getElementById('signUpName')
var emailInput = document.getElementById('signUpEmail')
var passwordInput = document.getElementById('signUpPassword')
var rePasswordInput = document.getElementById('signUpRePassword')
var userRadio = document.getElementById('role-User')
var adminRadio = document.getElementById('role-Admin')
var nameAlert = document.getElementById('nameAlert')
var emailAlert = document.getElementById('emailAlert')
var passwordAlert = document.getElementById('passwordAlert')
var repasswordAlert = document.getElementById('repasswordAlert')
var btn = document.getElementById('signUpButton')
var users = []
if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'))
}
function Submit() {
  if (userRadio.checked) var userRole = 'user'
  else var userRole = 'admin'
  var user = {
    Name: nameInput.value,
    Email: emailInput.value,
    Password: passwordInput.value,
    role: userRole,
    id: users.length + 1,
    borrowedBooks: [],
  }
  const userWithEmailExists = users.some((User) => User?.Email === user?.Email)
  if (!userWithEmailExists) {
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    window.location.href = '/login'
  } else {
    window.alert('Email Already Exists!!!')
  }
}

function Valid() {
  var regexName = /^[a-zA-Z\ ]{3,}$/

  if (!regexName.test(nameInput.value)) {
    nameInput.classList.add('is-invalid')
    nameAlert.classList.remove('d-none')
  } else {
    nameInput.classList.add('is-valid')
    nameInput.classList.remove('is-invalid')
    nameAlert.classList.add('d-none')
  }
  if (nameInput.value == '') {
    nameInput.classList.remove('is-invalid')
    nameInput.classList.remove('is-valid')
    nameAlert.classList.add('d-none')
  }
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

  if (rePasswordInput.value !== '') {
    if (rePasswordInput.value !== passwordInput.value) {
      rePasswordInput.classList.add('is-invalid')
      repasswordAlert.classList.remove('d-none')
    } else {
      rePasswordInput.classList.add('is-valid')
      rePasswordInput.classList.remove('is-invalid')
      repasswordAlert.classList.add('d-none')
    }
  } else {
    rePasswordInput.classList.remove('is-invalid')
    rePasswordInput.classList.remove('is-valid')
    repasswordAlert.classList.add('d-none')
  }
  if (
    regexName.test(nameInput.value) &&
    regexEmail.test(emailInput.value) &&
    regexPasssword.test(passwordInput.value) &&
    rePasswordInput.value == passwordInput.value &&
    (userRadio.checked || adminRadio.checked)
  ) {
    btn.removeAttribute('disabled')
  } else {
    btn.setAttribute('disabled', true)
  }
}

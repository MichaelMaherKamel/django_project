var nameInput = document.getElementById("contactName");
var emailInput = document.getElementById("contactEmail");
var commentInput = document.getElementById("comment");
var nameAlert = document.getElementById("nameAlert");
var emailAlert = document.getElementById("emailAlert");
var commentAlert = document.getElementById("commentAlert");
var btn = document.getElementById("contactUs");
var comments = [];
if (localStorage.getItem('comments')) {
   comments = JSON.parse(localStorage.getItem('comments'));
}

function sendComment() {
   var comment = {
      Name: nameInput.value,
      Email: emailInput.value,
      Comment: commentInput.value,
   };
   comments.push(comment);
   localStorage.setItem('comments', JSON.stringify(comments));
   window.alert('Your Request is sent successfully !!!')
   reset()
}

function Valid() {
   var regexName = /^[a-zA-Z1-9]{3,}$/;
   if (!regexName.test(nameInput.value)) {
      nameInput.classList.add("is-invalid");
      nameAlert.classList.remove("d-none");
   }
   else {
      nameInput.classList.add("is-valid");
      nameInput.classList.remove("is-invalid");
      nameAlert.classList.add("d-none");
   }
   if (nameInput.value == "") {
      nameInput.classList.remove("is-invalid");
      nameInput.classList.remove("is-valid");
      nameAlert.classList.add("d-none");
   }
   var regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

   if (!regexEmail.test(emailInput.value)) {
      emailInput.classList.add("is-invalid");
      emailAlert.classList.remove("d-none");
   }
   else {
      emailInput.classList.add("is-valid");
      emailInput.classList.remove("is-invalid");
      emailAlert.classList.add("d-none");
   }
   if (emailInput.value == "") {
      emailInput.classList.remove("is-invalid");
      emailInput.classList.remove("is-valid");
      emailAlert.classList.add("d-none");
   }
   var regexComment = /^.{10,}$/;
   if (!regexComment.test(commentInput.value)) {
      commentInput.classList.add("is-invalid");
      commentAlert.classList.remove("d-none");
   }
   else {
      commentInput.classList.add("is-valid");
      commentInput.classList.remove("is-invalid");
      commentAlert.classList.add("d-none");
   }
   if (commentInput.value == "") {
      commentInput.classList.remove("is-invalid");
      commentInput.classList.remove("is-valid");
      commentAlert.classList.add("d-none");
   }
   if (regexName.test(nameInput.value) &&
      regexEmail.test(emailInput.value) &&
      regexComment.test(commentInput.value)
   ) {
      btn.removeAttribute("disabled")
   } else {
      btn.setAttribute("disabled", true)
   }
}
function reset() {
   nameInput.value = ""
   emailInput.value = ""
   commentInput.value = ""
   nameInput.classList.remove("is-valid");
   nameInput.classList.remove("is-invalid");
   emailInput.classList.remove("is-valid");
   emailInput.classList.remove("is-invalid");
   commentInput.classList.remove("is-valid");
   commentInput.classList.remove("is-invalid");
}
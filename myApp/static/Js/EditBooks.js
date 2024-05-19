let bookCover = document.getElementById("cover");
let bookTitle = document.getElementById("title");
let bookAuthor = document.getElementById("author");
let bookCategory = document.getElementById("category");
let bookDescription = document.getElementById('description');
let btn = document.getElementById('addBook');
var nameAlert = document.getElementById("nameAlert");
var authorAlert = document.getElementById("authorAlert");
var descAlert = document.getElementById("descAlert");
let photopath;
let books = []
var index = localStorage.getItem('EditBook');

if (localStorage.getItem('books')) {
   books = JSON.parse(localStorage.getItem('books'));
}

function file(event) {
   let selectedFile = event.target.files[0];
   let reader = new FileReader();
   reader.onload = function (event) {
      photopath = event.target.result;
      valid()
   };
   reader.readAsDataURL(selectedFile);
}

function valid() {
   let regexTitle = /^[a-zA-Z0-9\ ]{4,}$/;

   if (!regexTitle.test(bookTitle.value)) {
      bookTitle.classList.add("is-invalid");
      nameAlert.classList.remove("d-none");
   }
   else {
      bookTitle.classList.add("is-valid");
      bookTitle.classList.remove("is-invalid");
      nameAlert.classList.add("d-none");
   }
   if (bookTitle.value == "") {
      bookTitle.classList.remove("is-invalid");
      bookTitle.classList.remove("is-valid");
      nameAlert.classList.add("d-none");
   }

   let regexAuthor = /^[a-zA-Z\ ]{4,}$/;

   if (!regexAuthor.test(bookAuthor.value)) {
      bookAuthor.classList.add("is-invalid");
      authorAlert.classList.remove("d-none");
   }
   else {
      bookAuthor.classList.add("is-valid");
      bookAuthor.classList.remove("is-invalid");
      authorAlert.classList.add("d-none");
   }
   if (bookAuthor.value == "") {
      bookAuthor.classList.remove("is-invalid");
      bookAuthor.classList.remove("is-valid");
      authorAlert.classList.add("d-none");
   }

   let regexDescription = /^.{10,}$/;

   if (!regexDescription.test(bookDescription.value)) {
      bookDescription.classList.add("is-invalid");
      descAlert.classList.remove("d-none");
   }
   else {
      bookDescription.classList.add("is-valid");
      bookDescription.classList.remove("is-invalid");
      descAlert.classList.add("d-none");
   }
   if (bookDescription.value == "") {
      bookDescription.classList.remove("is-invalid");
      bookDescription.classList.remove("is-valid");
      descAlert.classList.add("d-none");
   }

   if (regexTitle.test(bookTitle.value) &&
      regexAuthor.test(bookAuthor.value) &&
      regexDescription.test(bookDescription.value) &&
      bookCategory.value) {
      btn.removeAttribute("disabled")
   } else {
      btn.setAttribute("disabled", true)
   }
}

function Submit() {
   let book = {
      id: books[index].id,
      title: bookTitle.value,
      author: bookAuthor.value,
      category: bookCategory.value,
      description: bookDescription.value,
      cover: bookCover.value ? photopath : books[index].cover ,
      borrowed: false,
   }
   books[index]=book
   localStorage.setItem('books', JSON.stringify(books))
   window.alert('Book Editted Successfully !!')
}
function setValues(){

   bookTitle.value = books[index].title
   bookAuthor.value = books[index].author
   bookCategory.value = books[index].category
   bookDescription.value = books[index].description
}
setValues()
let localUser = localStorage.getItem('currentUser')
   ? JSON.parse(localStorage.getItem('currentUser')).id - 1 : null

let allUsers = localStorage.getItem('users')
   ? JSON.parse(localStorage.getItem('users')) : []

let books = localStorage.getItem('books')
   ? JSON.parse(localStorage.getItem('books')) : []

function getBooks() {

   let cartona = ``
   for (let i = 0; i < books.length; ++i) {
      if (books[i] != null) {
         cartona += `
         <td>
         <img src="${books[i].cover}" height="250" onclick="details(${books[i].id - 1000})" style="cursor:pointer;">
         <p><b>${books[i].title}</b></p>
         <p>by ${books[i].author}</p>
         <button id=${books[i].id} class="manageBtn" onclick="Edit(event)">Edit book</button>
         <button id=${books[i].id} class="manageBtn ban" style="margin-top:5px;" onclick="remove(event)">
            Delete book
         </button>
         </td>
      `
      }

   }
   document.getElementById('bookShowCase').innerHTML = cartona
}

function Edit(event) {
   localStorage.setItem('EditBook', event.target.id - 1000)
   window.location.href = 'editBook.html'
}

function selectBook() {
   var selectedGenre = genreSelect.value;

   for (let i = 0; i < books.length; i++) {
      var bookIndx = document.getElementById(books[i].id);

      if (selectedGenre == "All") {
         bookIndx.closest('td').style.display = "table-cell";
      }
      else {
         if(books[i]!= null){
            if (books[bookIndx.id - 1000].category == selectedGenre) {
               bookIndx.closest('td').style.display = "table-cell";
            } else {
               bookIndx.closest('td').style.display = "none";
            }
         }
      }
   }
};

function remove(event) {
   for(let i = 0 ; i < allUsers.length ; ++i){
      if(allUsers[i]?.borrowedBooks?.includes(event.target.id - 1000)){
         allUsers[i]?.borrowedBooks?.splice(allUsers[i]?.borrowedBooks?.indexOf(event.target.id - 1000) , 1)
         break;
      }
   }
   localStorage.setItem('users' , JSON.stringify(allUsers))
   books[event.target.id - 1000] = null
   localStorage.setItem('books' , JSON.stringify(books))
   getBooks()
}

function details(index) {
   localStorage.setItem('bookDetails', index)
   window.location.href = "/Admin/AdminDetails.html"
}

getBooks()

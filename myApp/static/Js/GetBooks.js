let localUser = localStorage.getItem('currentUser')
   ? JSON.parse(localStorage.getItem('currentUser')).id - 1 : null

let allUsers = localStorage.getItem('users')
   ? JSON.parse(localStorage.getItem('users')) : []

let books = localStorage.getItem('books')
   ? JSON.parse(localStorage.getItem('books')) : []

if (window.location.pathname == '/OurBooks.html') {
   getBooks()
} else if (window.location.pathname == '/BorrowedList.html') {
   getBorrowedBooks()
}

function getBorrowedBooks() {
   let borrowed = allUsers[localUser].borrowedBooks
   let cartona = ``
   if (borrowed.length) {
      for (let i = 0; i < borrowed.length; ++i) {
         if (books[borrowed[i]] != null) {
            cartona += `
            <td style="text-align: center;">
            <img src="${books[borrowed[i]].cover}" height="250" style="cursor:pointer;" onclick="details(${books[borrowed[i]].id - 1000})">
            <p><b>${books[borrowed[i]].title}</b></p>
            <p>by ${books[borrowed[i]].author}</p>
            <button id="${books[borrowed[i]].id}" class="returnBtn" onclick="returnBook(event)">
            Return
            </button>
            </td>
            `
         }
      }
   } else {
      cartona = `<h2 style="text-align:center;">You haven't borrowed any books yet !!!</h2>`
   }
   document.getElementById('borrowedBooks').innerHTML = cartona
}

function getBooks() {
   let cartona = ``
   for (let i = 0; i < books.length; ++i) {
      if (books[i] != null) {
         cartona += `
         <td>
         <img src="${books[i].cover}" height="250" style="cursor:pointer;" onclick="details(${books[i].id - 1000})">
         <p><b>${books[i].title}</b></p>
         <p>by ${books[i].author}</p>
         ${(allUsers[localUser]?.borrowedBooks?.includes(books[i].id - 1000))
               ? `<button id=${books[i].id} class="returnBtn" onclick="returnBook(event)">Return</button>`
               : (books[i].borrowed)
                  ? `<button id=${books[i].id} class="borrowedBtn">Not Available</button>`
                  : `<button id=${books[i].id} class="borrowBtn" onclick="borrow(event)">Borrow</button>`
            }
         </td> 
         `
      }
   }
   document.getElementById('bookShowCase').innerHTML = cartona
}

function borrow(event) {
   if (localUser != null) {
      allUsers[localUser].borrowedBooks.push(event.target.id - 1000)
      localStorage.setItem('users', JSON.stringify(allUsers))
      books[event.target.id - 1000].borrowed = true
      localStorage.setItem('books', JSON.stringify(books))
      getBooks()
   } else {
      window.location.href = "/Login.html"
   }
}

function returnBook(event) {
   allUsers[localUser].borrowedBooks.splice(allUsers[localUser].borrowedBooks.indexOf(event.target.id - 1000), 1)
   localStorage.setItem('users', JSON.stringify(allUsers))
   books[event.target.id - 1000].borrowed = false
   localStorage.setItem('books', JSON.stringify(books))
   if (window.location.pathname == '/OurBooks.html')
      getBooks()
   else
      getBorrowedBooks()
}

function selectBook() {
   var selectedGenre = genreSelect.value;

   for (let i = 0; i < books.length; i++) {
      var bookIndx = document.getElementById(books[i].id);

      if (selectedGenre == "All") {
         bookIndx.closest('td').style.display = "table-cell";
      } else if (selectedGenre === "Available") {
         if (bookIndx.className == "borrowedBtn") {
            bookIndx.closest('td').style.display = "none";
         } else {
            bookIndx.closest('td').style.display = "table-cell";
         }
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
}

function details(index) {
   localStorage.setItem('bookDetails', index)
   window.location.href = "/UserDetails.html"
}
let localUser = localStorage.getItem('currentUser')
   ? JSON.parse(localStorage.getItem('currentUser')).id - 1 : null

let allUsers = localStorage.getItem('users')
   ? JSON.parse(localStorage.getItem('users')) : []

let books = localStorage.getItem('books')
   ? JSON.parse(localStorage.getItem('books')) : []

let myBook = localStorage.getItem('bookDetails')

function displayMyBook() {
   let cartona =
      `
   <div class="book-cover">
      <img src="${books[myBook].cover}" alt="">
   </div>
   <div class="book-info">
      <h2>Title: ${books[myBook].title}</h2>
      <p><span>Author:</span> ${books[myBook].author}</p>
      <p><span>Genre:</span> ${books[myBook].category}</p>
      <p><span>Date:</span> ${books[myBook].date}</p>
      <p class="description"><span>Description: </span>${books[myBook].description}</p>
      ${(window.location.pathname == "/UserDetails.html")
         ? (allUsers[localUser]?.borrowedBooks?.includes(books[myBook].id - 1000))
            ? `<button id=${books[myBook].id} class="returnBtn" onclick="returnBook(event)">Return</button>`
            : (books[myBook].borrowed)
               ? `<button id=${books[myBook].id} class="borrowedBtn">Not Available</button>`
               : `<button id=${books[myBook].id} class="borrowBtn" onclick="borrow(event)">Borrow</button>`
         : `<button id=${books[myBook].id} class="manageBtn" onclick="Edit(event)">Edit book</button>
            <button id=${books[myBook].id} class="manageBtn ban" style="margin-top:5px;" onclick="remove(event)">
               Delete Book </button>
            `
      }
   </div>
   `
   document.getElementById('myBook').innerHTML = cartona
}

function returnBook(event) {
   allUsers[localUser].borrowedBooks.splice(allUsers[localUser].borrowedBooks.indexOf(event.target.id - 1000), 1)
   localStorage.setItem('users', JSON.stringify(allUsers))
   books[event.target.id - 1000].borrowed = false
   localStorage.setItem('books', JSON.stringify(books))
   displayMyBook()
}

function borrow(event) {
   if (localUser != null) {
      allUsers[localUser].borrowedBooks.push(event.target.id - 1000)
      localStorage.setItem('users', JSON.stringify(allUsers))
      books[event.target.id - 1000].borrowed = true
      localStorage.setItem('books', JSON.stringify(books))
      displayMyBook()
   } else {
      window.location.href = "/Login.html"
   }
}

function Edit(event) {
   localStorage.setItem('EditBook', event.target.id - 1000)
   window.location.href = 'EditBook.html'
}

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
   window.location.href = "AdminBooks.html"
}

displayMyBook()
var input = document.getElementById('search')
var selected = document.getElementById('searchType')

var books = []

if (localStorage.getItem('books')) {
   books = JSON.parse(localStorage.getItem('books'));
}

function search() {
   if (input.value) {
      let type = selected.value
      main(type)
   }
   if (input.value == "") {
      DisplayBooks(books)
   }
}

function main(type) {
   let key = input.value.toLowerCase();
   let filtered_books = [];

   filtered_books = books.filter(book => book?book[type].toLowerCase().includes(key):'');

   DisplayBooks(filtered_books)
}

let localUser = localStorage.getItem('currentUser')
   ? JSON.parse(localStorage.getItem('currentUser')).id - 1 : null

let allUsers = localStorage.getItem('users')
   ? JSON.parse(localStorage.getItem('users')) : []


function DisplayBooks(searchedBooks) {
   if (searchedBooks.length < 1) {
      document.getElementById('SearchOutput').innerHTML = `
      <h1 style="text-align: center; margin: 10rem;">There is no books found</h1>
      `
   }
   else {
      let cartona = ``
      for (let i = 0; i < searchedBooks.length; ++i) {
         if (searchedBooks[i] != null) {
            cartona += `
            <div class="SearchItem">
            <div style="display: flex;">
            <img src="${searchedBooks[i].cover}" alt="book.png" width="100">
            <div style="margin-left: 10px;">
            <h3>${searchedBooks[i].title}</h3>
            <p>${searchedBooks[i].author}</p>
            <p>Published in ${searchedBooks[i].date}</p>
            </div>
            </div>
            <div style="display: flex;flex-direction: column;">
            <button class="detailsBtn" onclick="details(${searchedBooks[i].id - 1000})">Show Book</button>
            ${(allUsers[localUser]?.borrowedBooks?.includes(searchedBooks[i].id - 1000))
                  ? `<button id=${searchedBooks[i].id} class="returnBtn" onclick="returnBook(event)">Return</button>`
                  : (searchedBooks[i].borrowed)
                     ? `<button id=${searchedBooks[i].id} class="borrowedBtn">Not Available</button>`
                     : `<button id=${searchedBooks[i].id} class="borrowBtn" onclick="borrow(event)">Borrow</button>`
               }
            </div>
            </div>
            `
         }
      }
      document.getElementById('SearchOutput').innerHTML = cartona
   }
}

function borrow(event) {
   if (localUser != null) {
      allUsers[localUser].borrowedBooks.push(event.target.id - 1000)
      localStorage.setItem('users', JSON.stringify(allUsers))
      books[event.target.id - 1000].borrowed = true
      localStorage.setItem('books', JSON.stringify(books))
      DisplayBooks(books)
   } else {
      window.location.href = "/Login.html"
   }
}

function returnBook(event) {
   allUsers[localUser].borrowedBooks.splice(allUsers[localUser].borrowedBooks.indexOf(event.target.id - 1000), 1)
   localStorage.setItem('users', JSON.stringify(allUsers))
   books[event.target.id - 1000].borrowed = false
   localStorage.setItem('books', JSON.stringify(books))
   DisplayBooks(books)
}

function details(index) {
   localStorage.setItem('bookDetails', index)
   window.location.href = "/UserDetails.html"
}

DisplayBooks(books)
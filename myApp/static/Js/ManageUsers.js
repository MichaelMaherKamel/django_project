var users = []
let books = []
let localBook = localStorage.getItem('books')

if (localBook) {
   books = JSON.parse(localBook);
}
if (localStorage.getItem('users')) {
   users = JSON.parse(localStorage.getItem('users'))
}

function getRandomDate() {
   const year = Math.floor(Math.random() * (2024 - 2020 + 1)) + 2020;
   const month = Math.floor(Math.random() * 12);
   const day = Math.floor(Math.random() * 31) + 1;
   const randomDate = new Date(year, month, day).toDateString();
   return randomDate;
}

function DisplayUsers() {
   var cartona = ``
   for (var i = 0; i < users.length; ++i) {
      let randomDate = getRandomDate();
      if (users[i] != null && users[i].role == 'user') {
         cartona += `<tr>
        <td>${users[i].id}</td>
        <td>${users[i].Name}</td>
        <td>${users[i].Email}</td>
        <td>${randomDate}</td>
        <td><button class="manageBtn" onclick="displayBorrowedBooks(${users[i].id - 1})">Show Books</button></td>
        <td><button class="manageBtn ban" onclick="Ban(${users[i].id - 1})">Ban</button></td>
        </tr>`
      }

   }
   document.getElementById('body').innerHTML = cartona;
}

function Ban(index) {
   for(let i = 0 ; i < users[index].borrowedBooks.length ; ++i){
      books[users[index].borrowedBooks[i]].borrowed = false 
   }
   users[index] = null
   localStorage.setItem('users' , JSON.stringify(users))
   localStorage.setItem('books' , JSON.stringify(books))
   DisplayUsers()
}

DisplayUsers()

function displayBorrowedBooks(id) {
   getBorrowedBooks(id)
   document.getElementById('borrowMain').style.display = 'flex'
}

function getBorrowedBooks(id) {
   let borrowed = users[id].borrowedBooks
   let cartona = ``
   if (borrowed.length < 1) {
      cartona += `<h1 style="margin:auto;font-size: 5rem;color:white;">User haven't borrow any books yet.</h1>`
   } else {
      for (let i = 0; i < borrowed.length; ++i) {
         cartona += `
      <div style="text-align: center;">
         <img src="${books[borrowed[i]].cover}" height="250" onclick="details(${books[borrowed[i]].id - 1000})" style="cursor:pointer;">
         <p><b>${books[borrowed[i]].title}</b></p>
         <p>by ${books[borrowed[i]].author}</p>
         <button id="${books[borrowed[i]].id}" class="returnBtn" onclick="returnBook(event , ${id})">
            Return
         </button>
      </div>
     `
      }
   }
   document.getElementById('borrowedlist').innerHTML = cartona
}

function EXC() {
   document.getElementById('borrowMain').style.display = 'none'
}

function returnBook(event, id) {
   users[id].borrowedBooks.splice(users[id].borrowedBooks.indexOf(event.target.id - 1000), 1)
   localStorage.setItem('users', JSON.stringify(users))
   books[event.target.id - 1000].borrowed = false
   localStorage.setItem('books', JSON.stringify(books))
   getBorrowedBooks(id)
}

function details(index) {
   localStorage.setItem('bookDetails', index)
   window.location.href = "/Admin/AdminDetails.html"
}

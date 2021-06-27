//Get The UI Element//
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');




//Book Class Define//
class Book {
  constructor(
    title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//Define UI Class//
class UI {
  /* constructor() {
 
   }*/
  static addToBooklist(book) {//It called From newBook Function//
    //console.log("hello");
    let list = document.querySelector('#book-list');
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">x</a></td>`;
    list.appendChild(row);




  }


  //Define clearFields Function//
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  //Define showAlert Function//
  static showAlert(message, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');
    let form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //If Alert Will Disappear In 3sec//
    /*setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);*/
    //Arrow Function In Form//
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  static deleteFromBook(target) {
    //console.log(target);
    if (target.hasAttribute('href')) {
      target.parentElement.parentElement.remove();
      //Delete For Local Storage//
      Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
      UI.showAlert('Book Removed!!', 'success');
    }
  }
}
//Define Local Stroage Class//
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  //Function addBook In This Class//
  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    //Then addBook Function Will Be Called To newBook Function//
  }
  //Local Stroage Books Will Be Displayed In This Function//
  //Define displayBooks Function//
  static displayBooks() {
    let books = Store.getBooks();
    books.forEach(book => {
      UI.addToBooklist(book);
      //Then Add DOM Eventlistener//
    });
  }
  //Defining removeBook Function//
  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));//Set Local Storage//
    //Then Go To  deleteFromBook Function in UI Class //
  }

}
//Add Event Listener//
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());

//Define newBook Function//
function newBook(e) {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let isbn = document.querySelector('#isbn').value;
  //If Any Fields Requires Empty//
  //let ui = new UI();      //Works for UI Class//
  if (title === '' || author === '' || isbn === '') {
    //alert("All Fields!!");
    UI.showAlert("Please Fill the Form!!", "error");
  }
  else {
    let book = new Book(title, author, isbn);
    //console.log(book);
    let ui = new UI();
    UI.addToBooklist(book);//Then Go To UI Class//

    UI.clearFields();//clearField In Box//
    //When Book Will Be Added Then Show Alert//
    UI.showAlert("Book Added!", "success");
    Store.addBook(book);
    //Then Display The LocalStorage Saved Items In Store Class//
  }

  e.preventDefault();


}

//Defining removeBook Function//
function removeBook(e) {
  e.preventDefault();
  //let ui = new UI();
  UI.deleteFromBook(e.target);
  //ui.showAlert('Book Removed!!', 'success');
}

//Permanantly Deletion for LocalStorage//
//Go To Store Class To Create removeBook Function//

